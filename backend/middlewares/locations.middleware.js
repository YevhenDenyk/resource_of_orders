const ApiError = require("../error/ApiError");
const {locationsService} = require("../services");

module.exports = {
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