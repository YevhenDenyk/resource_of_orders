const Joi = require('joi');
const {REGION, EMAIL, PASSWORD, PHONE} = require("../enums/regexp.enum");

module.exports = {
    create: Joi.object({
        region: Joi.string().required().regex(REGION),
        name: Joi.string().required().max(30),
        email: Joi.string().required().trim().lowercase().regex(EMAIL),
        password: Joi.string().required().regex(PASSWORD),
        phone: Joi.string().required().regex(PHONE),
        representative: Joi.string().required().max(30),
        jobPosition: Joi.string().required().max(20),
    }),
    update: Joi.object({
        region: Joi.string().optional().regex(REGION),
        name: Joi.string().optional().max(30),
        email: Joi.string().optional().trim().lowercase().regex(EMAIL),
        phone: Joi.string().optional().regex(PHONE),
        representative: Joi.string().optional().max(30),
        jobPosition: Joi.string().optional().max(20),
    }),
}