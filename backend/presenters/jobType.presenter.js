const {normalizeContractor} = require("./contractor.presenter");


const normalizeJobTypeWithContractors = (obj) => {
    obj.generalConstructionWorks = normalizeContractor(obj.generalConstructionWorks)
    obj.refrigerationEquipment = normalizeContractor(obj.refrigerationEquipment)
    obj.technologicalEquipment = normalizeContractor(obj.technologicalEquipment)
    obj.ventilationAndAirConditioning = normalizeContractor(obj.ventilationAndAirConditioning)
    obj.liftingEquipmentAndElevators = normalizeContractor(obj.liftingEquipmentAndElevators)
    obj.dieselGenerators = normalizeContractor(obj.dieselGenerators)
    obj.electricity = normalizeContractor(obj.electricity)
    obj.waterAndHeating = normalizeContractor(obj.waterAndHeating)

    return obj
}

module.exports = {
    normalizeJobTypeWithContractors
}