module.exports = {
    MONGO_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PHONE: /^[+][3][8][0][0-9]{9}$/,
    REGION: /^((Північ)|(Схід)|(Центр)|(Південь)|(Захід))$/,
    LOCATION_STATUS: /^((Проект)|(Відкритий)|(Реконструкція)|(Закритий))$/,
    JOB_TYPE: /^((generalConstructionWorks)|(refrigerationEquipment)|(technologicalEquipment)|(ventilationAndAirConditioning)|(liftingEquipmentAndElevators)|(dieselGenerators)|(electricity)|(waterAndHeating))$/,
    ORDER_PRIORITY: /^((Критичний)|(Високий)|(Плановий)|(Низький))$/,
    ORDER_STATUS: /^((Нова)|(В роботі)|(Виконана)|(Відхилена)|(Скасована))$/,

}