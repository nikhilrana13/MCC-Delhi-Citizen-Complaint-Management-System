const express = require("express")
const router = express.Router()
const multer = require("multer")
const IsCitizenAuth = require("../Middleware/IsCitizenAuth")
const { UpdateCitizenProfile, GetCitizenProfile, ChangeCitizenAccountPassword } = require("../Controllers/CitizenController")
const {body} = require("express-validator")

// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

router.get("/profile",IsCitizenAuth,GetCitizenProfile)
router.put("/updateprofile",IsCitizenAuth,upload.single("profileimage"),[body('email')
        .isEmail()
        .optional()
        .normalizeEmail()
        .withMessage('Please provide a valid email')],UpdateCitizenProfile)
router.put("/changepassword",IsCitizenAuth,[body('oldpassword')
        .notEmpty()
        .withMessage('Old Password is required')
        .isString()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
        body('newpassword')
        .notEmpty()
        .withMessage('New Password is required')
        .isString()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
       ],ChangeCitizenAccountPassword)

module.exports = router


