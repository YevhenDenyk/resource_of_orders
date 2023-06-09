const router = require('express').Router();

const {usersController} = require("../controllers");
const {usersMiddleware} = require("../middlewares");

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
    '/:userId',
    usersMiddleware.isUserIdValid,
    usersMiddleware.getUserDynamically('userId','params','_id'),
    usersController.getOneUser,
);

router.put(
    '/:userId',
    usersMiddleware.isUserIdValid,
    usersMiddleware.isBodyUpdateValid,
    usersMiddleware.getUserDynamically('userId','params','_id'),
    usersController.updateUser,
);

router.delete(
    '/:userId',
    usersMiddleware.isUserIdValid,
    usersMiddleware.getUserDynamically('userId','params','_id'),
    usersController.deleteUser,
);