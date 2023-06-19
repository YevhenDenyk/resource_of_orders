const router = require('express').Router();

const {locationsMiddleware, commonMiddleware} = require('../middlewares');
const {locationsController} = require('../controllers');
const {locationsValidator} = require("../validators");

router.get(
    '/',
    locationsController.getAllAndFilter
);

router.post(
    '/',
    commonMiddleware.isBodyValid(locationsValidator.create),
    locationsController.create
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    locationsMiddleware.isLocationExist,
    locationsController.getOne
);

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(locationsValidator.update),
    locationsMiddleware.isLocationExist,
    locationsController.update
);

router.delete(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    locationsMiddleware.isLocationExist,
    locationsController.delete
)

module.exports = router
