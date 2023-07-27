const {commentsService, usersService, contractorsService, locationsService, emailService} = require("../services");
const {ENGINEER_EMAIL} = require("../configs/config");
const {NEW_COMMENT} = require("../enums/emailAction.enum");

module.exports = {
    create: async (req, res, next) => {
        try {
            const {orderNumber, contractor, user, location} = req.order;
            const {essenceEmail, essenceName, essenceId} = req.tokenInfo;

            const comment = await commentsService.create({...req.body, essenceName, essenceId});

            //відправка емейлу
            const [userIfo, contractorInfo, locationInfo] = await Promise.all([
                usersService.findOne({_id: user}),
                contractorsService.findOne({_id: contractor}),
                locationsService.getOneById(location)
            ])


// Формування списку адресатів та видалення адреси відправника коментаря
            const emails = [ENGINEER_EMAIL, contractorInfo.email, userIfo.email]
            const index = emails.findIndex(el => el === essenceEmail);
            emails.splice(index, 1)

            await Promise.allSettled(
                emails.map((email) =>
                    emailService.sendEmail(email, NEW_COMMENT, {
                        orderNumber,
                        address: locationInfo.fullAddress,
                        description: req.body.text
                    })
                )
            )

            res.status(201).json(comment);
        } catch (e) {
            next(e);
        }
    },
}