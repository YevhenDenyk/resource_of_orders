const {usersService} = require('../services');

module.exports = {
    getAllUsersAndFilter : async (req, res, next) => {
            try {
                const data = await usersService.find(req.query);

                // data.users = normalize

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
}