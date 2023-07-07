const {
    ordersService,
    emailService,
    usersService,
    contractorsService,
    locationsService,
    s3Service
} = require('../services');
const {ENGINEER_EMAIL} = require("../configs/config");
const {NEW_ORDER, CLOSED_ORDER} = require("../enums/emailAction.enum");
const {executionTimeHelper} = require("../helpers/executionTime.helper");
const {FILE_TO_ORDER} = require("../enums/itemType.enam");


module.exports = {
    getAllAndFilter: async (req, res, next) => {
        try {
            const orders = await ordersService.getAllAndFilter(req.query);

            res.status(200).json(orders);
        } catch (e) {
            next(e);
        }
    },

    getByIdWithCommits: async (req, res, next) => {
        try {
            const orderWithCommits = await ordersService.getByIdWithCommits(req.order._id);

            res.status(200).json(orderWithCommits);
        } catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            const {body, tokenInfo} = req;

            const orderNumber = new Date().valueOf();
            const executionTime = executionTimeHelper(body.priority);
            const user = tokenInfo.essenceId;
            const {location} = await usersService.findOne({_id: tokenInfo.essenceId});

            const locationFulInfo = await locationsService.getByIdWithJobTypes(location);
//потрібна перевірка чи вірна локація в юзера прописана бо може не бути
            const contractor = locationFulInfo.jobTypes[body.jobType];
// потрібна перевірак чи взагалі існують види робіт
            const contractorFullInfo = await contractorsService.findOne({_id: contractor})
            //потрібна перевірка чи такий підрядник існує,
            const emails = [ENGINEER_EMAIL, contractorFullInfo.email];

            const order = await ordersService.create({...body, orderNumber, executionTime, user, location, contractor});

            await Promise.allSettled(
                emails.map((email) => emailService.sendEmail(email, NEW_ORDER, {
                        orderNumber,
                        address: `Регіон ${locationFulInfo.region}, м.${locationFulInfo.city}, ${locationFulInfo.address}`,
                        description: body.description
                    })
                )
            )

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const {contractor, user, orderNumber, location, description} = req.order
            const {orderStatus} = req.body

            const order = await ordersService.update(req.params._id, req.body);

            ////преевіряємо чи не змінено підрядника
            //// якщо його змінено - йому лист про нову заявку, а старому підряднику про скасування

            if (req.body.contractor && req.body.contractor !== contractor.toString) {

                const [upContractor, oldContractor, locationInfo] = await Promise.all([
                    contractorsService.findOne({_id: req.body.contractor}),
                    contractorsService.findOne({_id: contractor}),
                    locationsService.getOneById(location),
                ])

                await Promise.allSettled([
                    emailService.sendEmail(upContractor.email, NEW_ORDER, {
                        orderNumber,
                        address: locationInfo.fullAddress,
                        description
                    }),
                    emailService.sendEmail(oldContractor.email, CLOSED_ORDER, {
                        orderNumber,
                        orderStatus: 'Відхилена',
                        address: locationInfo.fullAddress,
                        description
                    }),
                ])

            }

            ////якщо підрядника не змінено,то перевіряємо статус
            //// якщо заявка закривається повідомляємо всіх

            if (orderStatus === 'Виконана' || orderStatus === 'Відхилена' || orderStatus === 'Скасована') {

                const [userIfo, contractorInfo, locationInfo] = await Promise.all([
                    usersService.findOne({_id: user}),
                    contractorsService.findOne({_id: contractor}),
                    locationsService.getOneById(location)
                ])

                const emails = [ENGINEER_EMAIL, contractorInfo.email, userIfo.email]

                await Promise.allSettled(
                    emails.map((email) =>
                        emailService.sendEmail(email, CLOSED_ORDER, {
                            orderNumber,
                            address: locationInfo.fullAddress,
                            description,
                            orderStatus
                        })
                    )
                )
            }

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },

    uploadFiles: async (req, res, next) => {
        try {
            const {order, files} = req

            const sendData = await s3Service.uploadPublicFile(files.file, FILE_TO_ORDER, order._id);

            order.files.push(sendData.Location)

            const upOrder = await ordersService.update(order._id, {files: order.files});

            res.status(200).json(upOrder);
        } catch (e) {
            next(e);
        }
    },

}
