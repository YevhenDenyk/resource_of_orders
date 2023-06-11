const Location = require('../databases/Location');

module.exports = {
    findLocation: async (query) => {
        const {limit = 10, page = 1, region, city, address, phone, status} = query
        let findObj = {}

        if (region) {
            findObj = {...findObj, region: {$regex: region}}
        }
        if (city) {
            findObj = {...findObj, city: {$regex: city}}
        }
        if (address) {
            findObj = {...findObj, address: {$regex: address}}
        }
        if (phone) {
            findObj = {...findObj, phone: {$regex: phone}}
        }
        if (status) {
            findObj = {...findObj, status: {$regex: status}}
        }

        const [locations, count] = await Promise.all([
            Location.find(findObj).limit(+limit).skip(+limit * (page - 1)),
            Location.count(findObj),
        ])

        return {
            limit: +limit,
            page: +page,
            count,
            locations
        }
    },

    getByIdWithOrder: async (id) => {
        const res = await Location.aggregate([
            {
                $match: { //пошук у використовуваній колекції
                    _id: id
                }
            },
            {
                $lookup: { //пошук у приєднуваній колекції
                    from: 'orders', //назва колекції
                    localField: '_id', //поле в поточній колекції
                    foreignField: 'location', //поле в приєднуваній колекції
                    as: 'orders' // назва нового масиву який ми отримаємо
                }
            }
        ]);
        return res[0];
    },

    createLocation: async (location = {}) => {
        return Location.create(location)
    },

    updateLocation: async (location, id) => {
        return Location.findByIdAndUpdate(id, location, {new: true})
    },

    getOneById: async (id) => {
        return Location.findById(id)
    },
}
