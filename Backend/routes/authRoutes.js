const express = require("express");
const { register, login } = require("../controllers/authControllers");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route untuk register, meng-handle upload file menggunakan multer
router.post("/register", upload.single("identitaspedagang"), register);
router.post("/login", login);

module.exports = router;
