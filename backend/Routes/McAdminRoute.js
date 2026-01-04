const express = require("express")
const router = express.Router()
const multer = require("multer")
const IsMcAdminAuth = require("../Middleware/IsMcAdminAuth")
const { UpdateMcProfile, GetMcProfile } = require("../Controllers/McAdminController")

// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

router.get("/profile",IsMcAdminAuth,GetMcProfile)
router.put("/updateprofile",IsMcAdminAuth,upload.single("profilepic"),UpdateMcProfile)

module.exports = router


