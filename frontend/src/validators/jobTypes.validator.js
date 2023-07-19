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


const createJobTypeValidator = Joi.object({
    location: Joi.string().required().regex(MONGO_ID),
    [GENERAL_CONSTRUCTION_WORKS]: Joi.string().optional().regex(MONGO_ID),
    [REFRIGERATION_EQUIPMENT]: Joi.string().optional().regex(MONGO_ID),
    [TECHNOLOGICAL_EQUIPMENT]: Joi.string().optional().regex(MONGO_ID),
    [VENTILATION_AND_AIR_CONDITIONING]: Joi.string().optional().regex(MONGO_ID),
    [LIFTING_EQUIPMENT_AND_ELEVATORS]: Joi.string().optional().regex(MONGO_ID),
    [DIESEL_GENERATORS]: Joi.string().optional().regex(MONGO_ID),
    [ELECTRICITY]: Joi.string().optional().regex(MONGO_ID),
    [WATER_AND_HEATING]: Joi.string().optional().regex(MONGO_ID),
})
const updateJobTypeValidator = Joi.object({
    [GENERAL_CONSTRUCTION_WORKS]: Joi.string().optional().regex(MONGO_ID),
    [REFRIGERATION_EQUIPMENT]: Joi.string().optional().regex(MONGO_ID),
    [TECHNOLOGICAL_EQUIPMENT]: Joi.string().optional().regex(MONGO_ID),
    [VENTILATION_AND_AIR_CONDITIONING]: Joi.string().optional().regex(MONGO_ID),
    [LIFTING_EQUIPMENT_AND_ELEVATORS]: Joi.string().optional().regex(MONGO_ID),
    [DIESEL_GENERATORS]: Joi.string().optional().regex(MONGO_ID),
    [ELECTRICITY]: Joi.string().optional().regex(MONGO_ID),
    [WATER_AND_HEATING]: Joi.string().optional().regex(MONGO_ID),
})

export {createJobTypeValidator, updateJobTypeValidator}