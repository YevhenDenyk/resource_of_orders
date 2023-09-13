import Joi from 'joi'

import {
    GENERAL_CONSTRUCTION_WORKS,
    REFRIGERATION_EQUIPMENT,
    TECHNOLOGICAL_EQUIPMENT,
    VENTILATION_AND_AIR_CONDITIONING,
    LIFTING_EQUIPMENT_AND_ELEVATORS,
    DIESEL_GENERATORS,
    ELECTRICITY,
    WATER_AND_HEATING
} from "../enums/jobType.enum"
import {MONGO_ID} from "../enums";


const JobTypeValidator = Joi.object({
    [GENERAL_CONSTRUCTION_WORKS]: Joi.string().required().regex(MONGO_ID),
    [REFRIGERATION_EQUIPMENT]: Joi.string().required().regex(MONGO_ID),
    [TECHNOLOGICAL_EQUIPMENT]: Joi.string().required().regex(MONGO_ID),
    [VENTILATION_AND_AIR_CONDITIONING]: Joi.string().required().regex(MONGO_ID),
    [LIFTING_EQUIPMENT_AND_ELEVATORS]: Joi.string().required().regex(MONGO_ID),
    [DIESEL_GENERATORS]: Joi.string().required().regex(MONGO_ID),
    [ELECTRICITY]: Joi.string().required().regex(MONGO_ID),
    [WATER_AND_HEATING]: Joi.string().required().regex(MONGO_ID),
})

export {JobTypeValidator}