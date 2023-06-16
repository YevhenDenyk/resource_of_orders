const router = require('express').Router();

const {commonMiddleware, authMiddleware} = require("../middlewares");
const {authValidator} = require("../validators");
const {authController} = require("../controllers");

router.post(
    '/login',
    commonMiddleware.isBodyValid(authValidator.login),
    authMiddleware.checkWhoIsIt,
    authController.login
);

router.post(
    'refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    'logout',
    authMiddleware.checkAccessToken,
    authController.logout
)

module.exports = router
