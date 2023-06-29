const {ordersService, emailService, usersService, contractorsService, locationsService} = require('../services');
const {ENGINEER_EMAIL} = require("../configs/config");
const {NEW_ORDER, CLOSED_ORDER} = require("../enums/emailAction.enum");

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
            const {body, location, contractor} = req

            const orderNumber = new Date().valueOf()

            const order = await ordersService.create({...body, orderNumber});


            const emails = [ENGINEER_EMAIL, contractor.email]

            await Promise.allSettled(
                emails.map((email) => emailService.sendEmail(email, NEW_ORDER, {
                        orderNumber,
                        address: location.fullAddress,
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

}
