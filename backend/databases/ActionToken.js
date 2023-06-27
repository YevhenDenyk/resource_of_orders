const {model,Schema} = require('mongoose');

const actionTokenSchema = new Schema({
    essenceId: {type: String, required: true},
    actionToken: {type: String, required: true},
    contractor: {type: Boolean, default: false },
},{
    timestamps:true
});

module.exports = model('ActionToken',actionTokenSchema);