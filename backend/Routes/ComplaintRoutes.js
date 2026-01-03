const express =  require("express")
const router = express.Router()
const multer = require("multer")
const {CreateComplaint,EachCitizenComplaints, FetchAllComplaints, UpdateStatusofComplaint} = require("../Controllers/ComplaintController")
const IsCitizenAuth = require("../Middleware/IsCitizenAuth")
const IsMcAdminAuth = require("../Middleware/IsMcAdminAuth")

// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

// citizen complaints routes
router.post("/create-complaint",upload.array("images",4),IsCitizenAuth,CreateComplaint)
router.get("/my-complaints",IsCitizenAuth,EachCitizenComplaints)
// McAdmin complaints routes
router.get("/all-complaints",IsMcAdminAuth,FetchAllComplaints)
router.put("/update-status/:id",IsMcAdminAuth,UpdateStatusofComplaint)


module.exports = router