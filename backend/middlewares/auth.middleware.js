const ApiError = require("../error/ApiError");
const {authService, contractorsService, usersService, actionTokenService, oldPasswordService} = require("../services");
const {REFRESH_TOKEN} = require("../enums/tokenType.enum");

module.exports = {
    checkWhoIsIt: async (req, res, next) => {
        try {
            const {email, password, contractor} = req.body

            if (contractor) {
                const findContractor = await contractorsService.findOne({email});

                if (!findContractor) {
                    throw new ApiError('Contractor not found', 404)
                }
                req.essence = findContractor
            }

            if (!contractor) {
                const user = await usersService.findOne({email})

                if (!user) {
                    throw new ApiError('User not found', 404)
                }
                req.essence = user
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            if (!accessToken) {
                throw new ApiError('No token', 401)
            }

            const payload = authService.checkTokenPair(accessToken);

            const tokenInfo = await authService.findByToken({accessToken});

            if (!tokenInfo || payload.essence_id !== tokenInfo.essence_id) {
                throw new ApiError('Unknown token', 401)
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization')

            if (!refreshToken) {
                throw new ApiError('No token', 401)
            }

            const payload = authService.checkTokenPair(refreshToken, REFRESH_TOKEN);

            const tokenInfo = await authService.findByToken({refreshToken});

            if (!tokenInfo || payload.essence_id !== tokenInfo.essence_id) {
                throw new ApiError('Unknown token', 401)
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization')

            if (!actionToken) {
                throw new ApiError('No token', 401)
            }

            const payload = authService.checkActionToken(actionToken);

            const tokenInfo = await actionTokenService.findOne(actionToken);

            if (!tokenInfo || payload.essence_id !== tokenInfo.essence_id) {
                throw new ApiError('Unknown token', 401)
            }

            if (tokenInfo.contractor) {
                const essence = await contractorsService.findOne({_id: tokenInfo.essence_id});
                req.essence = essence
            }
            if (!tokenInfo.contractor) {
                const essence = await usersService.findOne({_id: tokenInfo.essence_id});
                req.essence = essence
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkOldPasswords: async (req, res, next) => {
        try {
            const {_id, password} = req.essence;

            const oldPasswords = await oldPasswordService.findAllPasswordByUser(_id);

            oldPasswords.push({oldPassword: password})

            const results = await Promise.all(
                oldPasswords.map((record) => authService.compareOldPassword(record.oldPassword, req.body.password))
            )

            const condition = results.some((res) => res);

            if (condition) {
                throw new ApiError("This is old password", 409)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}