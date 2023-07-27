const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    essenceId: {type: String, required: true},
    essenceName: {type: String, required: true},
    order: {type: Schema.Types.ObjectId, ref: 'Order'},
    text: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('Comment', commentSchema)