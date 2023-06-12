const {Schema, model} = require('mongoose');
const {
    GENERAL_CONSTRUCTION_WORKS,
    DIESEL_GENERATORS,
    ELECTRICITY,
    LIFTING_EQUIPMENT_AND_ELEVATORS,
    REFRIGERATION_EQUIPMENT,
    TECHNOLOGICAL_EQUIPMENT,
    VENTILATION_AND_AIR_CONDITIONING,
    WATER_AND_HEATING
} = require('../enums/jobType.enum');

const jobSchema = new Schema({
    location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
    [GENERAL_CONSTRUCTION_WORKS]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [REFRIGERATION_EQUIPMENT]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [TECHNOLOGICAL_EQUIPMENT]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [VENTILATION_AND_AIR_CONDITIONING]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [LIFTING_EQUIPMENT_AND_ELEVATORS]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [DIESEL_GENERATORS]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [ELECTRICITY]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    [WATER_AND_HEATING]: {type: Schema.Types.ObjectId, ref: 'Contractor'},
}, {
    timestamps: true
})

module.exports = model('JobType', jobSchema)