const router = require("express").Router();

const {ordersMiddleware, commonMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');
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
    commonMiddleware.isBodyValid(ordersValidator.create),
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(STAFF_LEVEL),
    ordersController.create
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    ordersMiddleware.isOrderExist,
    ordersController.getByIdWithCommits
);

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isBodyValid(ordersValidator.update),
    ordersMiddleware.isOrderExist,
    ordersMiddleware.checkOrderStatus,
    ordersController.update
);

router.patch(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    commonMiddleware.isBodyValid(ordersValidator.updateStatus),
    ordersMiddleware.isOrderExist,
    ordersMiddleware.checkOrderStatus,
    ordersController.update
);

router.post(
    '/:_id/files',
    commonMiddleware.isMongoIdValid,
    fileMiddleware.checkUploadImage,
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(STAFF_LEVEL),
    ordersMiddleware.isOrderExist,
    ordersController.uploadFiles
)

module.exports = router
