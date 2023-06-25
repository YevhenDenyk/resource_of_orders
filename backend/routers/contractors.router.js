const router = require('express').Router();

const {contractorsController} = require('../controllers');
const {contractorsMiddleware, commonMiddleware, authMiddleware} = require('../middlewares');
const {contractorsValidator} = require("../validators");
const {LEAD_ENGINEER_LEVEL, ENGINEER_LEVEL} = require("../enums/accessLevel.enum");

router.get(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    contractorsController.getAllAndFilter
)

router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isBodyValid(contractorsValidator.create),
    contractorsController.create
)

router.get(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.getOne
)

router.put(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(contractorsValidator.update),
    contractorsMiddleware.isContractorExist,
    contractorsController.update
)

router.delete(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(LEAD_ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.delete
)

module.exports = router
