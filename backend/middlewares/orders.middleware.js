const {ordersValidator} = require('../validators');
const ApiError = require("../error/ApiError");
const {ordersService} = require("../services");

module.exports = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const validate = ordersValidator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyUpdateValid: async (req, res, next) => {
        try {
            const validate = ordersValidator.update.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 404)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isOrderExist : async (req, res, next) => {
            try {
                const order = await ordersService.getById(req.params._id);

                if (!order){
                    throw new ApiError('Order not found', 400)
                }

                req.order = order

                next();
            } catch (e) {
                next(e);
            }
      },

}
