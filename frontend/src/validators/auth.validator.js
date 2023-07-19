import Joi from 'joi'
import {EMAIL, PASSWORD} from '../enums'

const loginValidator = Joi.object({
    email: Joi.string().required().regex(EMAIL).lowercase().trim(),
    password: Joi.string().required().regex(PASSWORD),
    contractor: Joi.boolean().optional(),
});

const passwordValidator = Joi.object({
    password: Joi.string().required().regex(PASSWORD),
    confirmPassword: Joi.string().required().regex(PASSWORD).valid(Joi.ref('password')),
})

const emailValidator = Joi.object({
    email: Joi.string().required().regex(EMAIL).lowercase().trim(),
    contractor: Joi.boolean().optional(),
});

export {passwordValidator, loginValidator, emailValidator}