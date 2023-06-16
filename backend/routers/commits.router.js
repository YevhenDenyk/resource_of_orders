const router = require('express').Router();

const {commitsController} = require("../controllers");
const {commonMiddleware, commitsMiddleware} = require("../middlewares");
const {commitsValidator} = require("../validators");

router.post(
    '/',
    commonMiddleware.isBodyValid(commitsValidator.create),
    commitsMiddleware.isOrderExist,
    commitsController.create
)

module.exports = router