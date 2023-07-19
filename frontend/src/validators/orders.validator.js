import Joi from 'joi';
import {JOB_TYPE, MONGO_ID, ORDER_STATUS, ORDER_PRIORITY} from "../enums";


const createOrderValidator = Joi.object({
    jobType: Joi.string().required().regex(JOB_TYPE),
    priority: Joi.string().required().regex(ORDER_PRIORITY),
    description: Joi.string().required().min(10).max(300),
    files: Joi.string().optional(),
})
const updateOrderValidator = Joi.object({
    orderStatus: Joi.string().optional().regex(ORDER_STATUS),
    executionTime: Joi.number().optional().min(24).max(744),
    contractor: Joi.string().optional().regex(MONGO_ID),
    priority: Joi.string().optional().regex(ORDER_PRIORITY),
    description: Joi.string().optional().min(10).max(300),
    files: Joi.string().optional(),
})
const updateStatusOrderValidator = Joi.object({
    orderStatus: Joi.string().optional().regex(ORDER_STATUS),
})

export {createOrderValidator, updateStatusOrderValidator, updateOrderValidator}