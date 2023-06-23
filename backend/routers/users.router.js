const router = require('express').Router();

const {usersController} = require("../controllers");
const {usersMiddleware, commonMiddleware} = require("../middlewares");
const {usersValidator} = require("../validators");

router.get(
    '/',
    usersController.getAllUsersAndFilter,
);

router.post(
    '/',
    commonMiddleware.isBodyValid(usersValidator.createUser),
    usersMiddleware.checkIsEmailUnique,
    usersController.createUser,
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    usersMiddleware.getUserDynamically('_id', 'params'),
    usersController.getOneUser,
);

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    commonMiddleware.isBodyValid(usersValidator.updateUser),
    usersMiddleware.getUserDynamically('_id', 'params'),
    usersController.updateUser,
);

router.delete(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    usersMiddleware.getUserDynamically('_id', 'params'),
    usersController.deleteUser,
);

module.exports = router
