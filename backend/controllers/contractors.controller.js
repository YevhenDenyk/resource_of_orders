const {contractorsService, authService} = require('../services');

module.exports = {
    getAllAndFilter: async (req, res, next) => {
        try {
            const data = await contractorsService.findAndFilter(req.query);

            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    },
    getOne: async (req, res, next) => {
        try {

            res.status(200).json(req.contractor);
        } catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            const hashPassword = await authService.hashPassword(req.body.password);
            const contractor = await contractorsService.create({...req.body, password: hashPassword});

            res.status(201).json(contractor);
        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const contractor = await contractorsService.update(req.params._id, req.body);

            res.status(201).json(contractor);
        } catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            await contractorsService.delete(req.params._id)

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },
}