const ApiError = require("../error/ApiError");
const {ordersService} = require("../services");

module.exports = {
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
