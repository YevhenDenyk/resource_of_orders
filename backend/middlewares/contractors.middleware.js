const ApiError = require("../error/ApiError");
const {contractorsService} = require("../services");

module.exports = {
    isContractorExist: async (req, res, next) => {
        try {
            const contractor = await contractorsService.findOne({_id: req.params._id});

            if (!contractor) {
                throw new ApiError('Contractor not found', 404)
            }
            req.contractor = contractor
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

            const contractor = await contractorsService.findOne({email: req.body.email})

            if (contractor) {
                throw new ApiError(`Contractor with this email already exists`, 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}