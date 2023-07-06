const ApiError = require("../error/ApiError");
const {ordersService, contractorsService} = require("../services");

module.exports = {
    isOrderExist: async (req, res, next) => {
        try {
            const order = await ordersService.getById(req.params._id)

            if (!order) {
                throw new ApiError('Order not found', 400)
            }

            req.order = order

            next();
        } catch (e) {
            next(e);
        }
    },

    checkOrderStatus : async (req, res, next) => {
            try {
                const {orderStatus} = req.order

                if (orderStatus === 'Виконана'|| orderStatus ==='Відхилена'|| orderStatus==='Скасована'){
                    throw  new ApiError('This is order closed, you can\'t update this order.', 400)
                }

                next();
            } catch (e) {
                next(e);
            }
      },

    isContractorExist: async (req, res, next) => {
        try {
            const contractor = await contractorsService.findOne({_id: req.body.contractor});

            if (!contractor) {
                throw new ApiError('Contractor not found', 404)
            }

            req.contractor = contractor
            next();
        } catch (e) {
            next(e);
        }
    },

}
