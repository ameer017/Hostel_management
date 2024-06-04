const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin registration
router.post("/register", adminController.register);

// Admin login
router.post("/login", adminController.login);

// Delete admin

router.get("/admins", adminController.getAdmins);
router.post("/logout", adminController.logoutAdmin);

router.patch("/:id", adminController.updateAdmin);
router.get("/:adminId", adminController.getAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
