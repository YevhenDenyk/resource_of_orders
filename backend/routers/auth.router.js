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
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

router.post(
    '/password/forgot',
    authMiddleware.checkWhoIsIt,
    authController.forgotPassword
);

router.put(   //можна не вказувати юзер чи підрядник, інфа береться з бази
    '/password/forgot',
    commonMiddleware.isBodyValid(authValidator.password),
    authMiddleware.checkActionToken,
    authMiddleware.checkOldPasswords,
    authController.setPasswordAfterForgot
);

module.exports = router
