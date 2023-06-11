const {contractorsValidator} = require('../validators');
const ApiError = require("../error/ApiError");
const {contractorsService} = require("../services");

module.exports = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const validate = contractorsValidator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.validContractor = validate.value

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyUpdateValid: async (req, res, next) => {
        try {
            const validate = contractorsValidator.update.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.validContractor = validate.value

            next();
        } catch (e) {
            next(e);
        }
    },
    isContractorExist : async (req, res, next) => {
            try {
                const contractor = await contractorsService.getOneById(req.params._id);

                if (!contractor){
                    throw new ApiError('Contractor not found', 404)
                }

                next();
            } catch (e) {
                next(e);
            }
      },
}