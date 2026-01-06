const Response = require("../Utils/ResponseHandler")
const jwt = require("jsonwebtoken")

const IsCitizenAuth = async(req,res,next)=>{
   if (req.role !== "citizen") {
    return Response(res, 403, "Access denied: Citizen only");
  }
  next();
}

module.exports = IsCitizenAuth