const ApiError = require("../error/ApiError");
const {commitsValidator} = require("../validators");

module.exports = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const validate = commitsValidator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
