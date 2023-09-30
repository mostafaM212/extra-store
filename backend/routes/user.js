const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("", usersController.getUsers);

router.post("", usersController.addUser);
router.post("/login", usersController.loginUser);

router.get("/:id", usersController.getUser);
router.put("/:id", authMiddleware, usersController.updateUser);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;
