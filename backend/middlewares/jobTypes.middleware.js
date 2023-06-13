const ApiError = require("../error/ApiError");
const {jobTypesValidator} = require("../validators");
const {jobTypesService} = require("../services");



module.exports = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const validate = jobTypesValidator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const validate = jobTypesValidator.update.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsLocationUnique: async (req, res, next) => {
        try {
            const {location} = req.body

            if (!location) {
                throw new ApiError(`Location not present`, 400);
            }

          const jobType = await jobTypesService.findByLocation(location);

            if (jobType) {
                throw new ApiError(`Job types for this object already exist`, 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

}