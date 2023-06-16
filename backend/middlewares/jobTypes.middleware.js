const ApiError = require("../error/ApiError");
const {jobTypesService} = require("../services");



module.exports = {
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