const {jobTypesService} = require("../services");

module.exports = {
    getByIdLocation: async (req, res, next) => {
        try {
            const jobType = await jobTypesService.findByLocation(req.params._id);

            res.status(200).json(jobType);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const jobType = await jobTypesService.create(req.body);

            res.status(201).json(jobType);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const jobType = await jobTypesService.findByIdAndUpdate(req.params._id, req.body);

            res.status(201).json(jobType);
        } catch (e) {
            next(e);
        }
    },

}
