const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin registration
router.post("/register", adminController.register);

// Admin login
router.post("/login", adminController.login);

// Delete admin
router.delete("/:id", adminController.deleteAdmin);

router.get("/login-status/:adminId", adminController.getLoginStatus);
router.get("/:adminId", adminController.getAdmin);
router.get("/", adminController.getAdmins);

module.exports = router;
