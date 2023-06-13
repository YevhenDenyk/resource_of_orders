const JobType = require('../databases/JobType');

module.exports = {
    create: (jobType = {}) => {
        return JobType.create(jobType)
    },
    findByIdAndUpdate: (idLocation, jobType) => {
        return JobType.findOneAndUpdate({location: idLocation},jobType, {new: true})
    },
    findByLocation: (idLocation) => {
        return JobType.find({location: idLocation})
    }

}