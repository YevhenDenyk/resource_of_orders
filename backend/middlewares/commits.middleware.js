const {ordersService} = require("../services");
const ApiError = require("../error/ApiError");

module.exports = {
    isOrderExist : async (req, res, next) => {
            try {
                const order = await ordersService.getById(req.body.order);

                if (!order){
                    throw new ApiError('Order not found', 400)
                }

                next();
            } catch (e) {
                next(e);
            }
      },

}
