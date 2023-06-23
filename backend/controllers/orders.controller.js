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

    getByIdWithCommits: async (req, res, next) => {
        try {
            const orderWithCommits = await ordersService.getByIdWithCommits(req.order._id);

            res.status(200).json(orderWithCommits);
        } catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            const order = await ordersService.create({...req.body, orderNumber: new Date().valueOf()});

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