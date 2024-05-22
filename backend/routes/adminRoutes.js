const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin registration
router.post("/register", adminController.register);

// Admin login
router.post("/login", adminController.login);

// Delete admin
router.delete("/:id", adminController.deleteAdmin);

router.get("/login-status", adminController.getLoginStatus);
router.get("/getAdmin",  adminController.getAdmin);
router.get("/getAdmins", adminController.getAdmins);

router.patch("/updateAdmin", adminController.updateAdmin);

module.exports = router;
