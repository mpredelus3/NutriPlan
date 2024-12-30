const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail()
];

const resetPasswordValidation = [
  body('token').notEmpty(),
  body('password').isLength({ min: 6 })
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', auth, authController.getCurrentUser);
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

module.exports = router;
