var express = require('express');
var router = express.Router();
const jwtMiddleware = require ("../utils/jwtMiddleware")
const {signup, login, updateUser, fetchUserInfo } = require("./controller/userController")
const checkIsEmpty = require("./helpers/checkIsEmpty")
const checkIsUndefined = require("./helpers/checkIsUndefined")
const checkIsStrongPassword = require("./helpers/checkIsStrongPassword")
const {checkIsAlpha, checkIsEmail, checkIsAlphanumeric} = require("./helpers/authMiddleware")

/* GET users listing. */

router.post(
  "/signup",
  checkIsUndefined,
  checkIsEmpty, 
  checkIsAlpha,
  checkIsAlphanumeric,
  checkIsEmail,
  checkIsStrongPassword,
  signup
)

router.post(
  "/login",
  checkIsUndefined,
  checkIsEmpty, 
  login
)

router.put("/update-user-profile", jwtMiddleware, updateUser);
router.get("/get-user-info", jwtMiddleware, fetchUserInfo)

module.exports = router;
