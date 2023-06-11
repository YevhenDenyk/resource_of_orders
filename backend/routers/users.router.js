const router = require('express').Router();

const {usersController} = require("../controllers");
const {usersMiddleware,commonMiddleware} = require("../middlewares");

router.get(
    '/',
    usersController.getAllUsersAndFilter,
);

router.post(
    '/',
    usersMiddleware.isBodyCreateValid,
    usersMiddleware.checkIsEmailUnique,
    usersController.createUser,
);

router.get(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    usersMiddleware.getUserDynamically('userId','params','_id'),
    usersController.getOneUser,
);

router.put(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    usersMiddleware.isBodyUpdateValid,
    usersMiddleware.getUserDynamically('userId','params','_id'),
    usersController.updateUser,
);

router.delete(
    '/:_id',
    commonMiddleware.isMongoIdValid,
    usersMiddleware.getUserDynamically('userId','params','_id'),
    usersController.deleteUser,
);