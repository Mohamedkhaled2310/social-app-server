const express = require("express");
const router = express.Router();
const {getUser,updateUser}=require("../api/user/userController");
router.route('/:Id')
            .get(getUser)
            .patch(updateUser)
          
module.exports = router;