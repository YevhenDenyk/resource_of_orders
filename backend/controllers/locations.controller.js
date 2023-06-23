const {locationsService} = require('../services');

module.exports = {
    getAllAndFilter: async (req, res, next) => {
        try {
            const location = await locationsService.findLocation(req.query);

            res.status(200).json(location);
        } catch (e) {
            next(e);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const locationWithJob = await locationsService.getByIdWithJobTypes(req.location._id);

            res.status(200).json(locationWithJob);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const location = await locationsService.createLocation(req.body);

            res.status(201).json(location);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const upLocation = await locationsService.updateLocation(req.body, req.params._id);

            res.status(200).json(upLocation);
        } catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            await locationsService.deleteOne(req.params._id)

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}