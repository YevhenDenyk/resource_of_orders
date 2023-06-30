const {Schema, model} = require('mongoose');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const orderSchema = new Schema({
    jobType: {required: true, type: String},
    orderStatus: {required: true, type: String},
    executionTime: {required: true, type: Number},
    executionDate: {required: true, type: Date},
    contractor: {type: Schema.Types.ObjectId, ref: 'Contactor', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
    priority: {required: true, type: String},
    description: {required: true, type: String},
    files: [String],
    overdue: {type: Boolean, default: false},
    orderNumber: {type: Number, required: true},

}, {
    timestamps: true
});

orderSchema.statics = {
    async createWithExecutionDate(orderObject = {}) {
        const executionDate = dayjs().utc().add(orderObject.executionTime, 'h');

        return this.create({...orderObject, executionDate});
    },

    async updateWithExecutionDate(id, orderObject = {}) {

        if (orderObject.executionTime) {
            const oldOrder = await this.findById(id)

            const executionDate = dayjs(oldOrder.createdAt).utc().add(orderObject.executionTime, 'h');

            orderObject = {...orderObject, executionDate}
        }

        return this.findByIdAndUpdate(id, orderObject, {new: true});
    },
}

module.exports = model('Order', orderSchema)