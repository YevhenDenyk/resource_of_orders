const {Schema, model} = require('mongoose');

const commitSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    order: {type: Schema.Types.ObjectId, ref: 'Order'},
    text: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('Commit', commitSchema)