const router = require('express').Router();

const {commentsController} = require("../controllers");
const {commonMiddleware, commentsMiddleware, authMiddleware} = require("../middlewares");
const {commentsValidator} = require("../validators");
const {CONTRACTOR_LEVEL} = require("../enums/accessLevel.enum");

router.post(
    '/',
    commonMiddleware.isBodyValid(commentsValidator.create),
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    commentsMiddleware.isOrderExist,
    commentsController.create
)

module.exports = router