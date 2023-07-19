import Joi from 'joi'
import {MONGO_ID} from "../enums";


const createCommitValidator = Joi.object({
    order: Joi.string().required().regex(MONGO_ID),
    text: Joi.string().required().min(3).max(300),
})

export {createCommitValidator}