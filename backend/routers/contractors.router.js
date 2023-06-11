const router = require('express').Router();

const {contractorsController} = require('../controllers');
const {contractorsMiddleware, commonMiddleware} = require('../middlewares');

router.get(
    '/',
    contractorsController.getAllAndFilter
)

router.post(
    '/',
    contractorsMiddleware.isBodyCreateValid,
    contractorsController.create
)

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.getOneWithOrders
)

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.update
)

router.delete(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    contractorsMiddleware.isContractorExist,
    contractorsController.delete
)