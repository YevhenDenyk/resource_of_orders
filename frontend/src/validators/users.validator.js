import Joi from 'joi';
import {EMAIL, PASSWORD, PHONE, MONGO_ID} from "../enums";


const createUserValidator = Joi.object({
    firstName: Joi.string().required().min(2).max(20),
    lastName: Joi.string().required().min(2).max(20),
    profession: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(EMAIL).lowercase().trim(),
    password: Joi.string().required().regex(PASSWORD),
    phone: Joi.string().required().regex(PHONE),
    accessLevel: Joi.number().required().min(1).max(100),
    location: Joi.string().optional().regex(MONGO_ID)
})
const updateUserValidator = Joi.object({
    firstName: Joi.string().optional().min(2).max(20),
    lastName: Joi.string().optional().min(2).max(20),
    profession: Joi.string().optional().min(2).max(30),
    email: Joi.string().optional().regex(EMAIL).lowercase().trim(),
    phone: Joi.string().optional().regex(PHONE),
    accessLevel: Joi.number().optional().min(1).max(100),
    location: Joi.string().optional().regex(MONGO_ID)
})

export {createUserValidator, updateUserValidator}