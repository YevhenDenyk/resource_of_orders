const router = require('express').Router();

const {commitsController} = require("../controllers");
const {commonMiddleware, commitsMiddleware, authMiddleware} = require("../middlewares");
const {commitsValidator} = require("../validators");
const {CONTRACTOR_LEVEL} = require("../enums/accessLevel.enum");

router.post(
    '/',
    commonMiddleware.isBodyValid(commitsValidator.create),
    authMiddleware.checkAccessToken,
    authMiddleware.checkAccessLevel(CONTRACTOR_LEVEL),
    commitsMiddleware.isOrderExist,
    commitsController.create
)

module.exports = router