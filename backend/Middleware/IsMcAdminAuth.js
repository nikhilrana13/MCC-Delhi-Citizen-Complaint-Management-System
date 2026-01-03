const Response = require("../Utils/ResponseHandler")
const jwt = require("jsonwebtoken")

const IsMcAdminAuth = async(req,res,next)=>{
       const authHeader = req.headers.authorization 
       if(!authHeader || !authHeader.startsWith("Bearer ")){
          return Response(res,404,"Unauthorized or invalid token")
       }
    try {
         const token = authHeader.split(" ")[1]
         const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
         if(decoded.role !== "mc"){
            return Response(res,403,"Access Denied ! Only Mc Admin Allowed")
         }
         req.user = decoded.id 
         req.role = decoded.role
         next()
    } catch (error) {
        console.log("failed to verify token",error)
        return Response(res,500,"Internal server error")
    }
}

module.exports = IsMcAdminAuth