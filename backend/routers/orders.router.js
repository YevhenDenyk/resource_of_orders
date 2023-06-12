const router = require("express").Router();

const {ordersMiddleware, commonMiddleware} = require('../middlewares');
const {ordersController} = require('../controllers');

router.get(
    '/',
    ordersController.getAllAndFilter
)

router.post(
    '/',
    ordersMiddleware.isBodyCreateValid,
    ordersController.create
)

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    ordersMiddleware.isOrderExist,
    ordersController.getById
)

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    ordersMiddleware.isOrderExist,
    ordersController.update
)