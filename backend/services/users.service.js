const User = require('../databases/User');

module.exports = {
    find: async (query) => {
        const {limit = 10, page = 1, firstName, lastName, email, phone} = query

        let findObject = {}

        if (firstName) {
            findObject = {...findObject, firstName: {$regex: firstName}}
        }
        if (lastName) {
            findObject = {...findObject, lastName: {$regex: lastName}}
        }
        if (email) {
            findObject = {...findObject, email: {$regex: email}}
        }
        if (phone) {
            findObject = {...findObject, phone: {$regex: phone}}
        }

        const [users, count] = await Promise.all([
            User.find(findObject).limit(+limit).skip(+limit * (page - 1)),
            User.count(findObject),
        ])

        const totalPage = Math.ceil(count/limit)

        return {
            limit: +limit,
            page: +page,
            count,
            totalPage,
            users
        }
    },

    createUser: async (user = {}) => {
        return User.create(user)
    },

    updateOneById: async (id, user = {}) => {
        return User.findByIdAndUpdate(id, user, {new: true})
    },

    deleteById: async (id) => {
        return User.deleteOne({_id: id})
    },

    findOne: async (filter = {})=> {
        return User.findOne(filter)
    }


}