const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const {
  getAllProducts,
  getProductbyUserId,
  getProductById,
  createProduct,
  deleteProduct,
  editProduct,
  approveProduct,
} = require("../controllers/productsControllers");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createproduct",
  upload.array("images"),
  authenticateToken,
  createProduct
);
router.get("/getproducts", authenticateToken, getProductbyUserId);
router.get("/getallproducts", getAllProducts);
router.get("/:id", authenticateToken, getProductById);
router.put("/:id", authenticateToken, upload.array("images"), editProduct);
router.delete("/:id", deleteProduct);

router.put("/updatestatus/:id", authenticateToken, approveProduct);

module.exports = router;
