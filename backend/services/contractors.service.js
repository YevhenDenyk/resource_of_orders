const Contractor = require('../databases/Contractor');

module.exports = {
    findOne: async (filter = {})=>{
        return Contractor.findOne(filter)
    },

    create: async (contactor) => {
        return Contractor.create(contactor)
    },

    update: async (id, contactor={}) => {
        return Contractor.findByIdAndUpdate(id, contactor, {new: true})
    },

    delete: async (id) => {
        return Contractor.deleteOne({_id: id})
    },

    ////не запрацювало, не знайшов сенсу у використанні
    // getOneWithOrders: async (id) => {
    //     const res = await Contractor.aggregate([
    //         {
    //             $match: {
    //                 _id: id
    //             }
    //         },
    //         {
    //             $lookup: {
    //                 from: 'orders',
    //                 localField: '_id',
    //                 foreignField: 'contractor',
    //                 as: 'orders'
    //             }
    //         }
    //     ]);
    //     return res[0]
    // },

    findAndFilter: async (query) => {
        const {limit = 10, page = 1, name, email, phone} = query
        let findObject = {}

        if (name) {
            findObject = {...findObject, name: {$regex: name}}
        }
        if (email) {
            findObject = {...findObject, email: {$regex: email}}
        }
        if (phone) {
            findObject = {...findObject, phone: {$regex: phone}}
        }

        const [contractor, count] = await Promise.all([
            Contractor.find(findObject).limit(+limit).skip(+limit * (+page - 1)),
            Contractor.count(findObject)
        ])

        return {
            page: +page,
            limit: +limit,
            count,
            contractor
        }
    }

}