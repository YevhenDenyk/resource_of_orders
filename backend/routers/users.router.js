const router = require('express').Router();

const {usersController} = require("../controllers");
const {usersMiddleware, commonMiddleware, authMiddleware} = require("../middlewares");
const {usersValidator} = require("../validators");
const {STAFF_LEVEL, LEAD_ENGINEER_LEVEL, ADMIN_LEVEL} = require("../enums/accessLevel.enum");

router.get(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(STAFF_LEVEL),
    usersController.getAllUsersAndFilter,
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(LEAD_ENGINEER_LEVEL),
    commonMiddleware.isBodyValid(usersValidator.createUser),
    usersMiddleware.checkIsEmailUnique,
    usersController.createUser,
);

router.get(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(STAFF_LEVEL),
    commonMiddleware.isMongoIdValid,
    usersMiddleware.getUserDynamically('_id', 'params'),
    usersController.getOneUser,
);

router.put(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(LEAD_ENGINEER_LEVEL),
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(usersValidator.updateUser),
    usersMiddleware.getUserDynamically('_id', 'params'),
    usersController.updateUser,
);

router.delete(
    '/:_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(ADMIN_LEVEL),
    commonMiddleware.isMongoIdValid,
    usersMiddleware.getUserDynamically('_id', 'params'),
    usersController.deleteUser,
);

module.exports = router
