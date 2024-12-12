const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middlewares/auth");
const {
  getAllProducts,
  getProductbyUserId,
  getProductById,
  createProduct,
  deleteProduct,
  editProduct,
  approveProduct,
  clickProduct,
  relatedProducts,
  getProductsByOwnerId
} = require("../controllers/productsControllers");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createproduct",
  upload.array("images"),
  authenticateToken,
  createProduct
);

router.post(
  "/:id/click",
  authenticateToken,
  authorizeRole("pembeli"),
  clickProduct
);

router.get("/getproducts", authenticateToken, getProductbyUserId);
router.get("/getallproducts", getAllProducts);
router.get("/:id", authenticateToken, getProductById);
router.get("/detailproduct/:id", getProductById);
router.post("/related", relatedProducts);
router.post("/getproductfrom", getProductsByOwnerId)
router.put("/:id", authenticateToken, upload.array("images"), editProduct);
router.delete("/:id", deleteProduct);

router.put("/updatestatus/:id", authenticateToken, approveProduct);

module.exports = router;
