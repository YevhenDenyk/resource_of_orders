const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: {required: true, type: String},
    lastName: {required: true, type: String},
    profession: {required: true, type: String},
    email: {required: true, type: String, trim: true, lowercase: true},
    password: {required: true, type:String},
    phone: {required: true, type: String},
    accessLevel: {required: true, type: Number},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
}, {
    timestamps: true
})

module.exports = model('User', userSchema)