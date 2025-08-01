const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

router.post("/signup", validate(registerValidation), registerUser);
router.post("/login", validate(loginValidation), loginUser);

module.exports = router;