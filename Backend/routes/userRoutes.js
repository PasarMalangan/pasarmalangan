const express = require("express");
const router = express.Router();
const { getuser, editpembeli, editpedagang, getUsers } = require("../controllers/userControllers");
const { authenticateToken } = require("../middlewares/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET user profile
router.get("/getuser", authenticateToken, getuser);

router.put("/editpembeli", authenticateToken, upload.single("profilepict"), editpembeli);
router.put("/editpedagang", authenticateToken, upload.single("profilepict"), editpedagang);

router.get("/users", getUsers);


module.exports = router;
