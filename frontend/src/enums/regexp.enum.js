const MONGO_ID = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
const EMAIL = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
const PHONE = /^[+][3][8][0][0-9]{9}$/;
const REGION = /^((Північ)|(Схід)|(Центр)|(Південь)|(Захід))$/;
const LOCATION_STATUS = /^((Проект)|(Відкритий)|(Реконструкція)|(Закритий))$/;
const JOB_TYPE = /^((generalConstructionWorks)|(refrigerationEquipment)|(technologicalEquipment)|(ventilationAndAirConditioning)|(liftingEquipmentAndElevators)|(dieselGenerators)|(electricity)|(waterAndHeating))$/;
const ORDER_PRIORITY = /^((Критичний)|(Високий)|(Плановий)|(Низький))$/;
const ORDER_STATUS = /^((Нова)|(В роботі)|(Виконана)|(Відхилена)|(Скасована))$/;

export {MONGO_ID, PASSWORD, EMAIL, PHONE, REGION, LOCATION_STATUS, JOB_TYPE, ORDER_PRIORITY, ORDER_STATUS}