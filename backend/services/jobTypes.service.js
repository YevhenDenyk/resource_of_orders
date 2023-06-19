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
    }

}