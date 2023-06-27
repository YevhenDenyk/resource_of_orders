const OldPassword = require('../databases/OldPassword');

module.exports = {
    create: async (essenceId, oldPassword) => {
        return OldPassword.create({essenceId, oldPassword })
    },
    findAllPasswordByUser: async (essenceId) => {
        return OldPassword.find({essenceId}).lean()
    },
}