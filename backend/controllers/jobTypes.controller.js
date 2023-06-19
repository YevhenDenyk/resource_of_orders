const {jobTypesService} = require("../services");

module.exports = {
    getAll : async (req, res, next) => {
            try {
                const jobType = await jobTypesService.getAll();

                res.status(200).json(jobType);
            } catch (e) {
                next(e);
            }
      },
    getByIdLocation: async (req, res, next) => {
        try {

            res.status(200).json(req.jobType);
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
            const {_id} = req.jobType
            console.log(req.jobType)

            const jobType = await jobTypesService.findByIdAndUpdate(_id, req.body);

            res.status(201).json(jobType);
        } catch (e) {
            next(e);
        }
    },

}
