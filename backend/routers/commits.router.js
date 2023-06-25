const router = require('express').Router();

const {commitsController} = require("../controllers");
const {commonMiddleware, commitsMiddleware, authMiddleware} = require("../middlewares");
const {commitsValidator} = require("../validators");

router.post(
    '/',
    commonMiddleware.isBodyValid(commitsValidator.create),
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(10),
    commitsMiddleware.isOrderExist,
    commitsController.create
)

module.exports = router