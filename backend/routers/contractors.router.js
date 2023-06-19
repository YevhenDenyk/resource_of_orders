const router = require('express').Router();

const {contractorsController} = require('../controllers');
const {contractorsMiddleware, commonMiddleware} = require('../middlewares');
const {contractorsValidator} = require("../validators");

router.get(
    '/',
    contractorsController.getAllAndFilter
)

router.post(
    '/',
    commonMiddleware.isBodyValid(contractorsValidator.create),
    contractorsController.create
)

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.getOne
)

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(contractorsValidator.update),
    contractorsMiddleware.isContractorExist,
    contractorsController.update
)

router.delete(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.delete
)

module.exports = router
