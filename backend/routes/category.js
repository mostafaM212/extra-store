const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");
router.get("", categoryController.getCategories);

router.get("/:id", categoryController.getCategory);
router.post("", authMiddleware, categoryController.addCategory);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;
