const ActionToken = require('../databases/ActionToken');

module.exports = {
    create: async (essenceId, actionToken, contractor) => {
        return ActionToken.create({essenceId, actionToken, contractor})
    },
    findOne: async (actionToken) => {
        return ActionToken.findOne({actionToken})
    },
    deleteActionToken: async (actionToken)=>{
        return ActionToken.deleteOne({actionToken})
    },
}