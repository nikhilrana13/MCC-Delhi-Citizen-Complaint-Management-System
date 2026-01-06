const Response = require("../Utils/ResponseHandler")

const IsMcAdminAuth = async(req,res,next)=>{
      if (req.role !== "mc") {
          return Response(res, 403, "Access denied: Citizen only");
        }
        next();
}

module.exports = IsMcAdminAuth