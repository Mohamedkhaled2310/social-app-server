//user router

const express = require("express");
const router = express.Router();
const signUp = require("../user/index");
const base_url = "localhost:8000/";
router.post("${base_url}/api/user",signUp);

module.exports = router;