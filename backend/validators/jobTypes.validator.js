const Joi = require('joi');

const {
    GENERAL_CONSTRUCTION_WORKS,
    REFRIGERATION_EQUIPMENT,
    TECHNOLOGICAL_EQUIPMENT,
    VENTILATION_AND_AIR_CONDITIONING,
    LIFTING_EQUIPMENT_AND_ELEVATORS,
    DIESEL_GENERATORS,
    ELECTRICITY,
    WATER_AND_HEATING
} = require("../enums/jobType.enum");

const {MONGO_ID} = require("../enums/regexp.enum");

module.exports = {
    create: Joi.object({
        location: Joi.string().required().regex(MONGO_ID),
        [GENERAL_CONSTRUCTION_WORKS]: Joi.string().required().regex(MONGO_ID),
        [REFRIGERATION_EQUIPMENT]: Joi.string().required().regex(MONGO_ID),
        [TECHNOLOGICAL_EQUIPMENT]: Joi.string().required().regex(MONGO_ID),
        [VENTILATION_AND_AIR_CONDITIONING]: Joi.string().required().regex(MONGO_ID),
        [LIFTING_EQUIPMENT_AND_ELEVATORS]:Joi.string().required().regex(MONGO_ID),
        [DIESEL_GENERATORS]: Joi.string().required().regex(MONGO_ID),
        [ELECTRICITY]:Joi.string().required().regex(MONGO_ID),
        [WATER_AND_HEATING]: Joi.string().required().regex(MONGO_ID),
    }),
    update: Joi.object({
        [GENERAL_CONSTRUCTION_WORKS]: Joi.string().optional().regex(MONGO_ID),
        [REFRIGERATION_EQUIPMENT]: Joi.string().optional().regex(MONGO_ID),
        [TECHNOLOGICAL_EQUIPMENT]: Joi.string().optional().regex(MONGO_ID),
        [VENTILATION_AND_AIR_CONDITIONING]: Joi.string().optional().regex(MONGO_ID),
        [LIFTING_EQUIPMENT_AND_ELEVATORS]:Joi.string().optional().regex(MONGO_ID),
        [DIESEL_GENERATORS]: Joi.string().optional().regex(MONGO_ID),
        [ELECTRICITY]:Joi.string().optional().regex(MONGO_ID),
        [WATER_AND_HEATING]: Joi.string().optional().regex(MONGO_ID),
    }),

}