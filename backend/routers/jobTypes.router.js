const router = require('express').Router();

const {jobTypesMiddleware, commonMiddleware, locationsMiddleware} = require("../middlewares");
const {jobTypesController} = require("../controllers");
const {jobTypesValidator} = require("../validators");

router.post(
    '/',
    commonMiddleware.isBodyValid(jobTypesValidator.create),
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
    commonMiddleware.isBodyValid(jobTypesValidator.update),
    locationsMiddleware.isLocationExist,
    jobTypesController.update
)

module.exports = router
