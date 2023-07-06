const {CRITICAL, HIGH, PLANED, LOW} = require("../enums/orderPriority.enum");

module.exports = {

    executionTimeHelper: (priority) => {
        switch (priority) {
            case CRITICAL :
                return 24
            case HIGH:
                return 48
            case PLANED:
                return 120
            case LOW:
                return 288
        }
    },

}