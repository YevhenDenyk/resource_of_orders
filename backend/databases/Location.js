const {Schema, model} = require("mongoose");

const locationSchema = new Schema({
    region: {required: true, type: String},
    city: {required: true, type: String},
    address: {required: true, type: String},
    phone: {required: true, type: String},
    status: {required: true, type: String},
    description: {required: true, type: String},
}, {
    timestamps: true
})

module.exports = model('Location', locationSchema)