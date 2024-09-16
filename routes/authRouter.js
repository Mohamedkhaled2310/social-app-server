//user router

const express = require("express");
const {signUp,login} = require("../api/user/authentication");
const { loginValidation, signUpValidation } = require("../utils/authenticationSchema");
const router = express.Router();



router.post("/register",signUpValidation,signUp);

router.post("/login",loginValidation,login)

module.exports = router;