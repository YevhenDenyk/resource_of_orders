const router = require('express').Router();

const {commitsController} = require("../controllers");

router.post(
    '/',
    commitsController.create
)
