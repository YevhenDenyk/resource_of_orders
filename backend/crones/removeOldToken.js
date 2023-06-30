const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const Auth = require('../databases/Auth');
const ActionToken = require('../databases/ActionToken');

dayjs.extend(utc);

module.exports = new CronJob(
    '0 5 */1 * *',
    async function () {
        try {
            console.log('Start removing token')

            //повертає дату, беремо ютс, віднімаємо від неї (ОТРИМУЄМО дату з якої віднято певну кількість)
            const dayAgo = dayjs().utc().subtract(1, 'day');
            const daysAgo = dayjs().utc().subtract(7, "day")

            await Auth.deleteMany({createdAt: {$lte: dayAgo}});
            await ActionToken.deleteMany({createdAt: {$lte: daysAgo}});

            console.log('End removing token')
        } catch (e) {
            console.error(e)
        }
    }
)