const router = require('express').Router();

const {jobTypesMiddleware, commonMiddleware} = require("../middlewares");
const {jobTypesController} = require("../controllers");
const {jobTypesValidator} = require("../validators");

router.get(
    '/',
    jobTypesController.getAll
);

router.post(
    '/',
    commonMiddleware.isBodyValid(jobTypesValidator.create),
    jobTypesMiddleware.checkIsLocationExist,
    jobTypesMiddleware.checkIsLocationUnique,
    jobTypesController.create
);

router.get(
    '/:_idLocation',
    commonMiddleware.isMongoIdValid,
    jobTypesMiddleware.checkIsJobTypeExist,
    jobTypesController.getByIdLocation
)

router.put(
    '/:_idLocation',
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(jobTypesValidator.update),
    jobTypesMiddleware.checkIsJobTypeExist,
    jobTypesController.update
)

module.exports = router
