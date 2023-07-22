const {Schema, model} = require('mongoose');

const AuthSchema = new Schema({
    essenceId: {type: String, required: true},
    essenceEmail: {type: String, required: true},
    essenceName: {type: String, required: true},
    accessLevel: {type: Number, required: true},
    location: {type: String},
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true},
}, {
    timestamps: true
});

module.exports = model('Auth', AuthSchema);
