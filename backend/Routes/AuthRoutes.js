const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { RegisterCitizen, Login, LoginWithgoogle, Logout } = require('../Controllers/AuthController');
const IsgoogleAuth = require('../Middleware/isGoogleAuth');
const IsAnyAuth = require('../Middleware/IsAnyAuth');
const AuthMiddleware = require("../Middleware/AuthMiddleware")


// Register citizen route with validation
router.post('/register', [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isString()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name')
        .notEmpty()
        .trim()
        .escape()
        .withMessage('Name is required')
], RegisterCitizen);

// Login route with validation (for both citizen and mc)
router.post('/login', [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isString()
        .notEmpty()
        .withMessage('Password is required')
], Login);

// Login with google
router.post('/google-login',IsgoogleAuth,LoginWithgoogle)
// logout
router.get('/logout',AuthMiddleware ,IsAnyAuth,Logout)



module.exports = router;