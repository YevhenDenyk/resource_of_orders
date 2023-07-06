const ApiError = require("../error/ApiError");
const {jobTypesService, locationsService} = require("../services");


module.exports = {
    checkIsLocationUnique: async (req, res, next) => {
        try {
            const {location} = req.body

            if (!location) {
                throw new ApiError(`Location not present`, 400);
            }

            const jobType = await jobTypesService.findByLocation(location);

            if (jobType[0]) {
                throw new ApiError(`Job types for this location already exist`, 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsJobTypeExist: async (req, res, next) => {
        try {
            const jobType = await jobTypesService.findByLocation(req.params._idLocation);

            if (!jobType[0]) {
                throw new ApiError('Job Types to this location not found', 404)
            }

            req.jobType = jobType[0]

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsLocationExist: async (req, res, next) => {
        try {
            const location = await locationsService.getOneById(req.body.location)

            if (!location) {
                throw new ApiError('Location not found', 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

}