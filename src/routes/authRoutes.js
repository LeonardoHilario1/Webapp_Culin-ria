const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Página de login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Página de cadastro
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Logout
router.post('/logout', authController.postLogout);

module.exports = router;
