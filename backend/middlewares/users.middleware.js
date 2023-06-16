const ApiError = require("../error/ApiError");
const {usersService} = require("../services");


module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName]

            const user = await usersService.findOne({[dbField]: fieldToSearch})

            if (!user) {
                throw new ApiError(`User not found`, 404);
            }

            req.user = user

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            if (!req.body.email) {
                throw new ApiError(`Email not present`, 400);
            }

            const user = await usersService.findOne({email: req.body.email});

            if (user) {
                throw new ApiError(`User with this email already exists`, 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

}