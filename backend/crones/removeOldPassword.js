const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const OldPassword = require('../databases/OldPassword');

dayjs.extend(utc);

module.exports = new CronJob(
    '10 5 */1 * *',
    async function (){
        try {
            console.log('Start removing passwords')

            //повертає дату, беремо ютс, віднімаємо від неї (ОТРИМУЄМО дату з якої віднято певну кількість)
            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPassword.deleteMany({createdAt: { $lte: yearAgo }});

            console.log('End removing passwords')
        }catch (e) {
            console.error(e)
        }
    }
)