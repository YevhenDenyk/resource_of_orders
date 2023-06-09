const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    jobType: {required: true, type: String},
    status: {required: true, type: String},
    executionTime:{required: true, type: Number},
    contractor: {type: Schema.Types.ObjectId, ref: 'Contactor', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
    priority: {required: true, type: String},
    description: {required: true, type: String},
    files: [String],

}, {
    timestamps: true
})

module.exports = model('Order', orderSchema)