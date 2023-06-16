const {authService} = require("../services");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {essence, body} = req

            await authService.comparePassword(body.password, essence.password);

            const {accessToken, refreshToken} = authService.generateAccessTokenPair({
                essence_id: essence._id,
            });

            await authService.createInBase(essence._id, accessToken, refreshToken)

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
            const {essence_id, _id} = req.tokenInfo;

            await authService.deleteById(_id);

            const {accessToken, refreshToken} = authService.generateAccessTokenPair({essence_id});

            await authService.createInBase(essence_id, accessToken, refreshToken)

            res.status(201).json({accessToken, refreshToken});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {essence_id} = req.tokenInfo;

            await authService.deleteMany({essence_id})

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },
}
