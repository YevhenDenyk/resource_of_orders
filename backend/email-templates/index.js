const {WELCOME, FORGOT_PASS, DELETE_ACCOUNT, LOGOUT, NEW_ORDER, OVERDUE_ORDER, CLOSED_ORDER, NEW_COMMIT} = require("../enums/emailAction.enum");
module.exports = {
    [WELCOME]: {
        subject: "Welcome on board",
        templateName: 'welcome'
    },
    [FORGOT_PASS]: {
        subject: "Your password is under protected",
        templateName: 'forgot-password',
    },
    [DELETE_ACCOUNT]: {
        subject: "Successful deleted account",
        templateName: 'delete-account',
    },
    [LOGOUT]: {
        subject: "Successful logout all devices",
        templateName: 'logout',
    },
    [NEW_ORDER]:{
        subject: "New order",
        templateName: 'new-order'
    },
    [CLOSED_ORDER]:{
        subject: "Order is closed",
        templateName: 'closed-order'
    },
    [OVERDUE_ORDER]:{

    },
    [NEW_COMMIT]:{
        subject: "You have a new comment on the order",
        templateName: 'commit'
    },
}
