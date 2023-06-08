const router = require('express').Router;

const {usersController} = require("../controllers");
const {usersRMiddleware} = require("../middlewares");

router.get(
    '/',
    usersController.getAllUsersAndFilter,
)

router.post(
    '/',
    usersController.createUser
)