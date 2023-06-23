const ActionToken = require('../databases/ActionToken');

module.exports = {
    create: async (essence_id, actionToken, contractor) => {
        return ActionToken.create({essence_id, actionToken, contractor})
    },
    findOne: async (actionToken) => {
        return ActionToken.findOne({actionToken})
    },
    deleteActionToken: async (actionToken)=>{
        return ActionToken.deleteOne({actionToken})
    },
}