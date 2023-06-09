const {usersService} = require('../services');

module.exports = {
    getAllUsersAndFilter: async (req, res, next) => {
        try {
            const data = await usersService.find(req.query);

            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {

            const newUser = await usersService.createUser(req.body);

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: async (req, res, next) => {
        try {

            res.status(200).json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const user = await usersService.updateOneById(req.user._id, req.body)

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await usersService.deleteById(req.user._id)

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },

}