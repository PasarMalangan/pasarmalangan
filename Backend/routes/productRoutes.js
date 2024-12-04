const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const {
  getProduct,
  createProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/productsControllers");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createproduct",
  upload.array("images"),
  authenticateToken,
  createProduct
);
router.get("/getproducts", authenticateToken, getProduct);
router.get("/:id", authenticateToken, getProduct);
router.put(
  "/:id",
  authenticateToken,
  upload.array("images"),
  editProduct
);
router.delete("/:id", deleteProduct);

module.exports = router;
