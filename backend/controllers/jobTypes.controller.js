const {jobTypesService} = require("../services");
const {contractorsPresenter} = require("../presenters");

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

            detailJobType.generalConstructionWorks = contractorsPresenter.normalizeContractor(detailJobType.generalConstructionWorks)
            detailJobType.refrigerationEquipment = contractorsPresenter.normalizeContractor(detailJobType.refrigerationEquipment)
            detailJobType.technologicalEquipment = contractorsPresenter.normalizeContractor(detailJobType.technologicalEquipment)
            detailJobType.ventilationAndAirConditioning = contractorsPresenter.normalizeContractor(detailJobType.ventilationAndAirConditioning)
            detailJobType.liftingEquipmentAndElevators = contractorsPresenter.normalizeContractor(detailJobType.liftingEquipmentAndElevators)
            detailJobType.dieselGenerators = contractorsPresenter.normalizeContractor(detailJobType.dieselGenerators)
            detailJobType.electricity = contractorsPresenter.normalizeContractor(detailJobType.electricity)
            detailJobType.waterAndHeating = contractorsPresenter.normalizeContractor(detailJobType.waterAndHeating)

            res.status(200).json(detailJobType);
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

            const jobType = await jobTypesService.findByIdAndUpdate(_id, req.body);

            res.status(201).json(jobType);
        } catch (e) {
            next(e);
        }
    },

}
