const Joi = require("joi");
const {EMAIL, PASSWORD} = require("../enums/regexp.enum");

module.exports = {
    login: Joi.object({
        email: Joi.string().required().regex(EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(PASSWORD),
        contractor: Joi.boolean().optional(),
    }),
    password: Joi.string().required().regex(PASSWORD),

}