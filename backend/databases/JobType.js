const {Schema, model} = require('mongoose');

const jobSchema = new Schema({
    location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
    generalConstructionWorks: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    refrigerationEquipment: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    technologicalEquipment: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    ventilationAndAirConditioning: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    liftingEquipmentAndElevators: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    dieselGenerators: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    electricity: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    waterAndHeating: {type: Schema.Types.ObjectId, ref: 'Contractor'},
}, {
    timestamps: true
})

module.exports = model('JobType', jobSchema)