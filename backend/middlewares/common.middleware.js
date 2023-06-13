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


    //перевірити чи працюють
    isBodyCreateValid: (Validator)=> async (req, res, next) => {
        try {
            const validate = Validator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyUpdateValid: (Validator)=> async (req, res, next) => {
        try {
            const validate = Validator.update.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
