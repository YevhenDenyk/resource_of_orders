const ApiError = require("../error/ApiError");
const {authService, contractorsService, usersService} = require("../services");
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
}