const express =  require("express")
const router = express.Router()
const multer = require("multer")
const {CreateComplaint,EachCitizenComplaints} = require("../Controllers/ComplaintController")
const IsCitizenAuth = require("../Middleware/IsCitizenAuth")

// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

// citizen complaints routes
router.post("/create-complaint",upload.array("images",4),IsCitizenAuth,CreateComplaint)
router.get("/my-complaints",IsCitizenAuth,EachCitizenComplaints)


module.exports = router