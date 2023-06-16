const {ordersService} = require('../services');

module.exports = {
    getAllAndFilter: async (req, res, next) => {
        try {
            const orders = await ordersService.getAllAndFilter(req.query);

            res.status(200).json(orders);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            res.status(200).json(req.order);
        } catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            const order = await ordersService.create(req.body);

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const order = await ordersService.update(req.params._id, req.body);

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },
    updateStatus: async (req, res, next) => {
        try {
            const order = await ordersService.update(req.params._id, req.body);

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },
}