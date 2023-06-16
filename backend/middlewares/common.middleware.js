const {commonValidator} = require("../validators");

const ApiError = require("../error/ApiError");
const {usersService} = require("../services");

module.exports = {
    isMongoIdValid: async (req, res, next) => {
        try {
            const validate = commonValidator.isMongoIdValid.validate(req.params._id);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValid: (Validator) => async (req, res, next) => {
        try {
            const validate = Validator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }
            req.body = validate.data

            next();
        } catch (e) {
            next(e);
        }
    },

    ifUserHasAccessTo: (AccessLevel) => async (req, res, next) => {
        try {
            const {essence_id} = req.tokenInfo //Інфа береться після перевірки токену
            const {user} = req
            let userAccessLevel = 0


            if (user) {
                userAccessLevel = user.accessLevel
            }
            if (!user) {
                const user = await usersService.findOne({_id: essence_id});
                userAccessLevel = user.accessLevel
            }

            if ([AccessLevel] > userAccessLevel) {
                throw new ApiError('Sorry, your access level is not high enough', 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
