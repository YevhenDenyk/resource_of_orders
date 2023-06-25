const router = require('express').Router();

const {locationsMiddleware, commonMiddleware, authMiddleware} = require('../middlewares');
const {locationsController} = require('../controllers');
const {locationsValidator} = require("../validators");
const {ENGINEER_LEVEL, LEAD_ENGINEER_LEVEL, ADMIN_LEVEL} = require("../enums/accessLevel.enum");

router.get(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    locationsController.getAllAndFilter
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(LEAD_ENGINEER_LEVEL),
    commonMiddleware.isBodyValid(locationsValidator.create),
    locationsController.create
);

router.get(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    locationsMiddleware.isLocationExist,
    locationsController.getOne
);

router.put(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(LEAD_ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(locationsValidator.update),
    locationsMiddleware.isLocationExist,
    locationsController.update
);

router.delete(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ADMIN_LEVEL),
    commonMiddleware.isMongoIdValid,
    locationsMiddleware.isLocationExist,
    locationsController.delete
)

module.exports = router
