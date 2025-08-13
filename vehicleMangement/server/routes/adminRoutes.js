const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

router.get("/users", authMiddleware, adminOnly, getAllUsers);

module.exports = router;
