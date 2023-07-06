const {
    authService,
    emailService,
    actionTokenService,
    oldPasswordService,
    contractorsService,
    usersService
} = require("../services");
const {FRONTEND_URL} = require("../configs/config");
const {FORGOT_PASS} = require("../enums/emailAction.enum");


module.exports = {
    login: async (req, res, next) => {
        try {
            const {essence, body} = req

            await authService.comparePassword(body.password, essence.password);

            const {accessToken, refreshToken} = authService.generateAccessTokenPair({
                essenceId: essence._id,
            });

            await authService.createInBase(essence._id, essence.email, essence.name, essence.accessLevel, accessToken, refreshToken)

            res.status(200).json({
                accessToken,
                refreshToken,
                essence
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {essenceId, essenceEmail, accessLevel, _id, essenceName} = req.tokenInfo;

            await authService.deleteById(_id);

            const {accessToken, refreshToken} = authService.generateAccessTokenPair({essenceId});

            await authService.createInBase(essenceId, essenceEmail, essenceName, accessLevel, accessToken, refreshToken)

            res.status(201).json({accessToken, refreshToken});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {essenceId} = req.tokenInfo;

            await authService.deleteMany({essenceId})

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {essence, body} = req
            let name = ''

            if (body.contractor) {
                name = essence.name
            }
            if (!body.contractor) {
                name = `${essence.firstName} ${essence.lastName}`
            }

            const actionToken = authService.generateActionToken({essence_id: essence._id});
            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

            await Promise.all([
                emailService.sendEmail(essence.email, FORGOT_PASS, {userName: name, url: forgotPassFEUrl}),
                actionTokenService.create(essence._id, actionToken, body.contractor)
            ])

            res.status(200).json('The letter was send to the your email');
        } catch (e) {
            next(e);
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const {essence, body, tokenInfo} = req;


            const hashPassword = await authService.hashPassword(body.password);

            await Promise.allSettled([
                oldPasswordService.create(essence._id, essence.password),
                actionTokenService.deleteActionToken(tokenInfo.actionToken)
            ])

            if (tokenInfo.contractor) {
                await contractorsService.update(tokenInfo.essenceId, {password: hashPassword})
            }
            if (!tokenInfo.contractor) {
                await usersService.updateOneById(tokenInfo.essenceId, {password: hashPassword})
            }

            res.status(200).json('password updated');
        } catch (e) {
            next(e);
        }
    },


}
