const {model,Schema} = require('mongoose');

const oldPasswordSchema = new Schema({
    essence_id: {type: Schema.Types.ObjectId},
    oldPassword: {type: String},
},{
    timestamps:true
});

module.exports = model('OldPassword',oldPasswordSchema);