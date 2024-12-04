const express = require("express");
const router = express.Router();
const { getuser, editpembeli } = require("../controllers/userControllers");
const { authenticateToken } = require("../middlewares/auth");

// GET user profile
router.get("/getuser", authenticateToken, getuser);

// PUT user profile (update)
router.put("/editpembeli", authenticateToken, editpembeli);

module.exports = router;
