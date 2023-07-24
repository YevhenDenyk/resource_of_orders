const jobTypeTranslateHelper = (jobType) => {
  switch (jobType) {
      case 'generalConstructionWorks':
          return 'Загальнобудівельні роботи'
      case 'refrigerationEquipment':
          return 'Холодильне обладнання'
      case 'technologicalEquipment':
          return 'Технологічне обладнання'
      case 'ventilationAndAirConditioning':
          return 'Вентиляції та кондиціонування обладнання'
      case 'liftingEquipmentAndElevators':
          return 'Ліфти та підйомне обладнання'
      case 'dieselGenerators':
          return 'Дизельні генератори'
      case 'electricity':
          return 'Електрика'
      case 'waterAndHeating':
          return 'Вода та опалення'
  }
};

export {jobTypeTranslateHelper}