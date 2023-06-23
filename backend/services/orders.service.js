const Order = require('../databases/Order');

module.exports = {
    create: async (order) => {
        return Order.create(order)
    },

    update: async (id, order) => {
        return Order.findByIdAndUpdate(id, order, {new: true})
    },

    getAllAndFilter: async (query) => {
        const {page = 1, limit = 10,contractor,location, jobType, orderStatus, overdue, priority} = query
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
        if (contractor) {
            findObj = {...findObj, contractor}
        }
        if (location) {
            findObj = {...findObj, location}
        }

        const [orders, count] = await Promise.all([
            Order.find(findObj).limit(+limit).skip(+limit * (+page - 1)),
            Order.count(findObj)
        ])

        return {
            limit: +limit,
            page: +page,
            count,
            orders
        }
    },

    getByIdWithCommits: async (id) => {
        const res = await Order.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $lookup: {
                    from: 'commits',
                    localField: '_id',
                    foreignField: 'order',
                    as: 'commits'
                }
            }
        ]);
        return res[0]
    },

    getById: async (id) => {
        return Order.findById(id)
    }

}