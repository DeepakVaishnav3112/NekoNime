const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const asyncHandler = require("express-async-handler");

router.post("/signup", asyncHandler(authController.signup));
router.post("/login", asyncHandler(authController.login));
router.post("/logout", asyncHandler(authController.logout));

module.exports = router;