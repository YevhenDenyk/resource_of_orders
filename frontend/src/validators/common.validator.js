import Joi from 'joi'
import {MONGO_ID} from "../enums";

const isMongoIdValidator = Joi.string().regex(MONGO_ID)

export {isMongoIdValidator}
