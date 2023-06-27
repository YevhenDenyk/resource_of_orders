const router = require("express").Router();

const {ordersMiddleware, commonMiddleware, authMiddleware} = require('../middlewares');
const {ordersController} = require('../controllers');
const {ordersValidator} = require("../validators");
const {CONTRACTOR_LEVEL, STAFF_LEVEL, ENGINEER_LEVEL} = require("../enums/accessLevel.enum");

router.get(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    ordersController.getAllAndFilter
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(STAFF_LEVEL),
    commonMiddleware.isBodyValid(ordersValidator.create),
    ordersMiddleware.isLocationExist,
    ordersMiddleware.isContractorExist,
    ordersController.create
);

router.get(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    commonMiddleware.isMongoIdValid,
    ordersMiddleware.isOrderExist,
    ordersController.getByIdWithCommits
);

router.put(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(ordersValidator.update),
    ordersMiddleware.isOrderExist,
    ordersMiddleware.checkOrderStatus,
    ordersController.update
);

router.put(
    '/:_id/status',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(ordersValidator.updateStatus),
    ordersMiddleware.isOrderExist,
    ordersMiddleware.checkOrderStatus,
    ordersController.update
);

module.exports = router
