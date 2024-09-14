//user router

const express = require("express");
const {signUp,login} = require("../api/user/authentication");
const { loginValidation, signUpValidation } = require("../middlewares/authenticationSchema");
const router = express.Router();



router.post("/",signUpValidation,signUp);

router.post("/login",loginValidation,login)

module.exports = router;