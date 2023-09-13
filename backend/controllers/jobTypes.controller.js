const {jobTypesService} = require("../services");
const {jobTypePresenter} = require("../presenters");

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
            const detailJobType = await jobTypesService.findByLocationAndPopulateContractors(req.jobType.location);

            const normalizeJobTypeWithContractors = jobTypePresenter.normalizeJobTypeWithContractors(detailJobType);

            res.status(200).json(normalizeJobTypeWithContractors);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const jobType = await jobTypesService.create(req.body);
            const detailJobType = await jobTypesService.findByLocationAndPopulateContractors(jobType.location);

            const normalizeJobTypeWithContractors = jobTypePresenter.normalizeJobTypeWithContractors(detailJobType);

            res.status(201).json(normalizeJobTypeWithContractors);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {_id} = req.jobType

            const jobType = await jobTypesService.findByIdAndUpdate(_id, req.body);

            res.status(201).json(jobType);
        } catch (e) {
            next(e);
        }
    },

}
