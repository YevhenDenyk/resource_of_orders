const Joi = require('joi');
const {MONGO_ID} = require("../enums/regexp.enum");

module.exports = {
    create: Joi.object({
        user: Joi.string().required().regex(MONGO_ID),
        order: Joi.string().required().regex(MONGO_ID),
        text: Joi.string().required().min(3).max(300),
    }),
}