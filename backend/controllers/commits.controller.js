const {commitsService} = require("../services");

module.exports = {
    create: async (req, res, next) => {
        try {
            const commit = await commitsService.create(req.body);

            res.status(201).json(commit);
        } catch (e) {
            next(e);
        }
    },
}