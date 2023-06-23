const router = require("express").Router();

const {ordersMiddleware, commonMiddleware} = require('../middlewares');
const {ordersController} = require('../controllers');
const {ordersValidator} = require("../validators");

router.get(
    '/',
    ordersController.getAllAndFilter
);

router.post(
    '/',
    commonMiddleware.isBodyValid(ordersValidator.create),
    ordersController.create
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    ordersMiddleware.isOrderExist,
    ordersController.getByIdWithCommits
);

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(ordersValidator.update),
    ordersMiddleware.isOrderExist,
    ordersController.update
);

router.put(
    '/:_id/status',
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(ordersValidator.updateStatus),
    ordersMiddleware.isOrderExist,
    ordersController.updateStatus
);

module.exports = router
