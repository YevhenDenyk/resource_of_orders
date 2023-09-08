const JobType = require('../databases/JobType');

module.exports = {
    getAll: async (filter = {}) => {
        return JobType.find(filter)
    },
    create: async (jobType = {}) => {
        return JobType.create(jobType)
    },
    findByIdAndUpdate: async (id, jobType) => {
        return JobType.findByIdAndUpdate(id, jobType, {new: true})
    },
    findByLocation: async (idLocation) => {
        return JobType.find({location: idLocation})
    },
    findByLocationAndPopulateContractors: async (idLocation) => {
        const res = await JobType.aggregate([
            {
                $match: {
                    location: idLocation
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'generalConstructionWorks',
                    foreignField: '_id',
                    as: 'generalConstructionWorks'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'refrigerationEquipment',
                    foreignField: '_id',
                    as: 'refrigerationEquipment'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'technologicalEquipment',
                    foreignField: '_id',
                    as: 'technologicalEquipment'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'ventilationAndAirConditioning',
                    foreignField: '_id',
                    as: 'ventilationAndAirConditioning'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'liftingEquipmentAndElevators',
                    foreignField: '_id',
                    as: 'liftingEquipmentAndElevators'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'dieselGenerators',
                    foreignField: '_id',
                    as: 'dieselGenerators'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'electricity',
                    foreignField: '_id',
                    as: 'electricity'
                }
            },
            {
                $lookup: {
                    from: 'contractors',
                    localField: 'waterAndHeating',
                    foreignField: '_id',
                    as: 'waterAndHeating'
                }
            },
        ])

        return {
            ...res[0],
            generalConstructionWorks: res[0].generalConstructionWorks[0],
            refrigerationEquipment: res[0].refrigerationEquipment[0],
            technologicalEquipment: res[0].technologicalEquipment[0],
            ventilationAndAirConditioning: res[0].ventilationAndAirConditioning[0],
            liftingEquipmentAndElevators: res[0].liftingEquipmentAndElevators[0],
            dieselGenerators: res[0].dieselGenerators[0],
            electricity: res[0].electricity[0],
            waterAndHeating: res[0].waterAndHeating[0],

        }
    }

}