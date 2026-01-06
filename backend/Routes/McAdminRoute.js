const express = require("express")
const router = express.Router()
const multer = require("multer")
const IsMcAdminAuth = require("../Middleware/IsMcAdminAuth")
const { UpdateMcProfile, GetMcProfile } = require("../Controllers/McAdminController")
const AuthMiddleware = require("../Middleware/AuthMiddleware")

// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

router.get("/profile",AuthMiddleware,IsMcAdminAuth,GetMcProfile)
router.put("/updateprofile",AuthMiddleware,IsMcAdminAuth,upload.single("profilepic"),UpdateMcProfile)

module.exports = router


