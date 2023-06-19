const Joi = require('joi');
const {JOB_TYPE, MONGO_ID, ORDER_STATUS, ORDER_PRIORITY} = require("../enums/regexp.enum");

module.exports = {
    create: Joi.object({
        jobType: Joi.string().required().regex(JOB_TYPE),
        orderStatus: Joi.string().required().regex(ORDER_STATUS),
        executionTime: Joi.number().required().max(744),
        contractor: Joi.string().required().regex(MONGO_ID),
        user: Joi.string().required().regex(MONGO_ID),
        location: Joi.string().required().regex(MONGO_ID),
        priority: Joi.string().required().regex(ORDER_PRIORITY),
        description: Joi.string().required().min(10).max(300),
        files: Joi.string().optional(),
    }),
    update: Joi.object({
        orderStatus: Joi.string().optional().regex(ORDER_STATUS),
        executionTime: Joi.number().optional().max(744),
        contractor: Joi.string().optional().regex(MONGO_ID),
        description: Joi.string().optional().min(10).max(300),
        files: Joi.string().optional(),
    }),
    updateStatus:  Joi.object({
        orderStatus: Joi.string().optional().regex(ORDER_STATUS),
    }),
}