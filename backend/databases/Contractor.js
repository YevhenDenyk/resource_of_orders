const {Schema, model} = require('mongoose');

const contractorSchema = new Schema({
    region: {required: true, type: String},
    name: {required: true, type: String},
    email: {required: true, type: String, trim: true, lowercase: true},
    password: {required: true, type: String},
    phone: {required: true, type: String},
    representative: {required: true, type: String},
    jobPosition: {required: true, type: String},
    accessLevel: {required: true, type: Number, default: 20},
}, {
    timestamps: true
})

module.exports = model('Contractor', contractorSchema)