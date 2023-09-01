const {usersService, authService, locationsService} = require('../services');
const {usersPresenter} = require("../presenters");

module.exports = {
    getAllUsersAndFilter: async (req, res, next) => {
        try {
            const data = await usersService.find(req.query);

            data.users = usersPresenter.normalizeUsers(data.users)
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await authService.hashPassword(req.body.password);

            const newUser = await usersService.createUser({...req.body, password: hashPassword});

            const normalizeUser = usersPresenter.normalizeUser(newUser);

            res.status(201).json(normalizeUser);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: async (req, res, next) => {
        try {
            const normalizeUser = usersPresenter.normalizeUser(req.user);
            const location = await locationsService.getOneById(req.user.location);

            res.status(200).json({...normalizeUser, location});
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const user = await usersService.updateOneById(req.user._id, req.body)

            const normalizeUser = usersPresenter.normalizeUser(user);
            const location = await locationsService.getOneById(req.user.location);
            res.status(201).json({...normalizeUser, location});
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