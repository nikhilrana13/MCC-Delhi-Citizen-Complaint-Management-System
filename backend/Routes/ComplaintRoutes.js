const express =  require("express")
const router = express.Router()
const multer = require("multer")
const {CreateComplaint,EachCitizenComplaints, FetchAllComplaints, UpdateStatusofComplaint, CitizenComplaintsStatus, McadminComplaintsStatus} = require("../Controllers/ComplaintController")
const IsCitizenAuth = require("../Middleware/IsCitizenAuth")
const IsMcAdminAuth = require("../Middleware/IsMcAdminAuth")
const AuthMiddleware = require("../Middleware/AuthMiddleware")

// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

// citizen complaints routes
router.post("/create-complaint",upload.array("images",4),AuthMiddleware,IsCitizenAuth,CreateComplaint)
router.get("/my-complaints",AuthMiddleware,IsCitizenAuth,EachCitizenComplaints)
router.get("/citizen/status",AuthMiddleware,IsCitizenAuth,CitizenComplaintsStatus)
// McAdmin complaints routes
router.get("/all-complaints",AuthMiddleware,IsMcAdminAuth,FetchAllComplaints)
router.get("/mcadmin/status",AuthMiddleware,IsMcAdminAuth,McadminComplaintsStatus)
router.put("/update-status/:id",AuthMiddleware,IsMcAdminAuth,UpdateStatusofComplaint)



module.exports = router