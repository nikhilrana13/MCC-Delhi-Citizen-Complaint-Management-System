const Citizen = require("../Models/CitizenModel");
const McModel = require("../Models/McModel");






const SaveFCMToken = async(req,res)=>{
    try {
         const userId = req.user 
         const {token} = req.body;
         const {role} = req.role 

         if(!token){
            return Response(res,400,"FCM token is required")
         }
         const Model = role === "citizen" ? Citizen : McModel 
         await Model.findByIdAndUpdate(userId,{fcmtoken:token})
         return Response(res,200,"Fcm token saved")

    } catch (error) {
    console.error("Save FCM token error", error);
    return Response(res, 500, "Internal server error");
    }
}

module.exports = SaveFCMToken