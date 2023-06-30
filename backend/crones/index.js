const removeOldPassword = require('./removeOldPassword');
const removeOldToken = require('./removeOldToken');
const overdueOrder = require('./overdueOrder');

const cronRunner = ()=>{

    removeOldPassword.start();
    removeOldToken.start();
    overdueOrder.start();
}

module.exports = {
    cronRunner
};
