const Joi = require('joi');

const {MONGO_ID} = require("../enums/regexp.enum");

module.exports = {
    isMongoIdValid: Joi.string().regex(MONGO_ID),
}
