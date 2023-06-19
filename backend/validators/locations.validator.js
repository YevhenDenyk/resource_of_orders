const Joi = require('joi');
const {REGION, PHONE, LOCATION_STATUS} = require("../enums/regexp.enum");

module.exports = {
    create: Joi.object({
        region: Joi.string().required().regex(REGION),
        city: Joi.string().required().min(3).max(20),
        address: Joi.string().required().min(3).max(40),
        phone: Joi.string().required().regex(PHONE),
        status: Joi.string().required().regex(LOCATION_STATUS),
        description: Joi.string().required().min(3).max(40)
    }),
    update: Joi.object({
        region: Joi.string().optional().regex(REGION),
        city: Joi.string().optional().min(3).max(20),
        address: Joi.string().optional().min(3).max(40),
        phone: Joi.string().optional().regex(PHONE),
        status: Joi.string().optional().regex(LOCATION_STATUS),
        description: Joi.string().optional().min(3).max(40)
    }),

}