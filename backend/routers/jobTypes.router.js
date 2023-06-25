const router = require('express').Router();

const {jobTypesMiddleware, commonMiddleware, authMiddleware} = require("../middlewares");
const {jobTypesController} = require("../controllers");
const {jobTypesValidator} = require("../validators");
const {ENGINEER_LEVEL} = require("../enums/accessLevel.enum");

router.get(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    jobTypesController.getAll
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isBodyValid(jobTypesValidator.create),
    jobTypesMiddleware.checkIsLocationExist,
    jobTypesMiddleware.checkIsLocationUnique,
    jobTypesController.create
);

router.get(
    '/:_idLocation',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    jobTypesMiddleware.checkIsJobTypeExist,
    jobTypesController.getByIdLocation
)

router.put(
    '/:_idLocation',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(jobTypesValidator.update),
    jobTypesMiddleware.checkIsJobTypeExist,
    jobTypesController.update
)

module.exports = router
