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
}