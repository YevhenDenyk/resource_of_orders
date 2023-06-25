const {commonValidator} = require("../validators");

const ApiError = require("../error/ApiError");

module.exports = {
    isMongoIdValid: async (req, res, next) => {
        try {
            const validate = commonValidator.isMongoIdValid.validate(req.params._id);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValid: (Validator) => async (req, res, next) => {
        try {
            const validate = Validator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }
            req.body = validate.value

            next();
        } catch (e) {
            next(e);
        }
    },

}
