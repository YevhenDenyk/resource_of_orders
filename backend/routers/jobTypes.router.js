const router = require('express').Router();

const {jobTypesMiddleware, commonMiddleware, locationsMiddleware} = require("../middlewares");
const {jobTypesController} = require("../controllers");

router.post(
    '/',
    jobTypesMiddleware.isBodyCreateValid,
    jobTypesMiddleware.checkIsLocationUnique,
    jobTypesController.create
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    jobTypesController.getByIdLocation
)

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    jobTypesMiddleware.isBodyUpdateValid,
    locationsMiddleware.isLocationExist,
    jobTypesController.update
)