const {commitsService, usersService, contractorsService, locationsService, emailService} = require("../services");
const {ENGINEER_EMAIL} = require("../configs/config");
const {NEW_COMMIT} = require("../enums/emailAction.enum");

module.exports = {
    create: async (req, res, next) => {
        try {
            const {orderNumber, contractor, user, location} = req.order;
            const {essenceEmail} = req.tokenInfo;

            const commit = await commitsService.create(req.body);

            //відправка емейлу
            const [userIfo, contractorInfo, locationInfo] = await Promise.allSettled([
                usersService.findOne({_id: user}),
                contractorsService.findOne({_id: contractor}),
                locationsService.getOneById(location)
            ])

            const address = ` Регіон ${locationInfo.region}, ${locationInfo.city}, ${locationInfo.address}`


// Формування списку адресатів та видалення адреси відправника коментаря
            const emails = [ENGINEER_EMAIL, contractorInfo.email, userIfo.email]

            const index = emails.findIndex(el => el === essenceEmail);

            emails.splice(index, 1)


            await Promise.allSettled(
                emails.map((email) =>
                    emailService.sendEmail(email, NEW_COMMIT, {
                        orderNumber,
                        address,
                        description: req.body.text
                    })
                )
            )

            res.status(201).json(commit);
        } catch (e) {
            next(e);
        }
    },
}