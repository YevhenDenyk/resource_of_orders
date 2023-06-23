const OldPassword = require('../databases/OldPassword');

module.exports = {
    create: async (essence_id, oldPassword) => {
        return OldPassword.create({essence_id, oldPassword })
    },
    findAllPasswordByUser: async (essence_id) => {
        return OldPassword.find({essence_id}).lean()
    },
}