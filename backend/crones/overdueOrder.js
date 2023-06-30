const {CronJob} = require('cron');

const Order = require('../databases/Order');


module.exports = new CronJob(
    ' */5 * * * *',
    async function () {
        try {
            console.log('Start checking overdue orders')

            // const dateNow1 = dayjs().utc()
            const dateNow = new Date()

            await Order.updateMany({ $and:[{overdue: false},{executionDate: {$lte: dateNow}}] },{overdue: true});

            console.log('End checking overdue orders')
        } catch
            (e) {
            console.error(e)
        }
    }
);
