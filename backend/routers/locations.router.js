const router = require('express').Router();

const {locationsMiddleware, commonMiddleware} = require('../middlewares');
const {locationsController} = require('../controllers');

router.get(
    '/',
    locationsController.getAllAndFilter
);

router.post(
    '/',
    locationsMiddleware.isBodyCreateValid,
    locationsController.create
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    locationsMiddleware.isLocationExist,
    locationsController.getOneAndOrders
);

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    locationsMiddleware.isBodyUpdateValid,
    locationsMiddleware.isLocationExist,
    locationsController.update
);
