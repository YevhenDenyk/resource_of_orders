const Order = require('../databases/Order');

module.exports = {
    create: async (order = {}) => {
        return Order.createWithExecutionDate(order)
    },

    update: async (id, order = {}) => {
        return Order.updateWithExecutionDate(id, order)
    },

    getAllAndFilter: async (query, payload = {}) => {
        let {page = 1, limit = 10, contractor, location, jobType, orderStatus, overdue, priority} = query
        const {contractorId, locationId} = payload

        let findObj = {}

        if (contractorId) contractor = contractorId
        if (locationId) location = locationId
        if (page <= 0) page = 1
        if (limit <= 0) limit = 10


        if (jobType) {
            findObj = {...findObj, jobType: {$regex: jobType}}
        }
        if (orderStatus) {
            findObj = {...findObj, orderStatus: {$regex: orderStatus}}
        }
        if (overdue) {
            findObj = {...findObj, overdue}
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
                    from: 'contractors',
                    localField: 'contractor',
                    foreignField: '_id',
                    as: 'detailContractor'
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'location',
                    foreignField: '_id',
                    as: 'detailLocation'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'detailUser'
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
        return {
            ...res[0],
            detailContractor: res[0].detailContractor[0],
            detailLocation: res[0].detailLocation[0],
            detailUser: res[0].detailUser[0]
        }
    },

    getById: async (id) => {
        return Order.findById(id)
    }

}