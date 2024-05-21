const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin registration
router.post('/register', adminController.register);

// Admin login
router.post('/login', adminController.login);

// Delete admin
router.delete('/:adminId', adminController.deleteAdmin);

module.exports = router;