const express = require("express");
const multerMiddleware = require("../middleware/multer.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

const productsController = require("../controllers/products.controller");

router.get("", productsController.getProducts);

router.post(
  "",
  authMiddleware,
  multerMiddleware,
  productsController.addProduct
);
router.get("/:id", productsController.getProduct);
router.put(
  "/:id",
  authMiddleware,
  multerMiddleware,
  productsController.updateProduct
);
router.delete("/:id", authMiddleware, productsController.deleteProduct);

module.exports = router;
