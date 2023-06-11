const {locationsValidator} = require('../validators');
const ApiError = require("../error/ApiError");
const {locationsService} = require("../services");

module.exports = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const validate = locationsValidator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const validate = locationsValidator.update.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isLocationExist: async (req, res, next) => {
        try {
            const location = await locationsService.getOneById(req.params._id);

            if (!location) {
                throw new ApiError('Location not found', 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}