const Joi = require('joi');
const {EMAIL, PASSWORD, PHONE, MONGO_ID} = require("../enums/regexp.enum");

module.exports = {
    createUser: Joi.object({
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        profession: Joi.string().required().min(2).max(30),
        email: Joi.string().required().regex(EMAIL).lowercase().trim(),
        password: Joi.string().required().regex(PASSWORD),
        phone: Joi.string().required().regex(PHONE),
        accessRights: Joi.number().required().min(1).max(5),
        location: Joi.string().required().regex(MONGO_ID)
    }),
    updateUser: Joi.object({
        firstName: Joi.string().optional().min(2).max(20),
        lastName: Joi.string().optional().min(2).max(20),
        profession: Joi.string().optional().min(2).max(30),
        email: Joi.string().optional().regex(EMAIL).lowercase().trim(),
        phone: Joi.string().optional().regex(PHONE),
        accessRights: Joi.number().optional().min(1).max(5),
        location: Joi.string().optional().regex(MONGO_ID)
    }),
}
