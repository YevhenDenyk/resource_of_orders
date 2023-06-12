const Order = require('../databases/Order');

module.exports = {
    create: async (order) => {
        return Order.create(order)
    },

    update: async (id, order) => {
        return Order.findByIdAndUpdate(id, order)
    },

    getAllAndFilter: async (query) => {
        const {page = 1, limit = 10, jobType, orderStatus, overdue, priority} = query
        let findObj = {}

        if (jobType) {
            findObj = {...findObj, jobType: {$regex: jobType}}
        }
        if (orderStatus) {
            findObj = {...findObj, orderStatus: {$regex: orderStatus}}
        }
        if (overdue) {
            findObj = {...findObj, overdue: {$regex: overdue}}
        }
        if (priority) {
            findObj = {...findObj, priority: {$regex: priority}}
        }

        const [orders, count]= await Promise.all([
            Order.find(findObj).limit(+limit).skip(+limit*(+page-1)),
            Order.count(findObj)
        ])

        return {
            limit: +limit,
            page: +page,
            count,
            orders
        }
    },

    getById: async (id) => {
        return Order.findById(id)
    }

}