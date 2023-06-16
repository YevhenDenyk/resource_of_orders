const {Schema, model} = require('mongoose');

const AuthSchema = new Schema({
    essence_id: {type: String, required: true},
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true},
}, {
    timestamps: true
});

module.exports = model('Auth', AuthSchema);
