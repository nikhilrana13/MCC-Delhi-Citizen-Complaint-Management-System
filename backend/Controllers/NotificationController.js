const Citizen = require("../Models/CitizenModel");
const McModel = require("../Models/McModel");
const Notification = require("../Models/NotificationModel");
const Response = require("../Utils/ResponseHandler");






const SaveFCMToken = async(req,res)=>{
    try {
         const userId = req.user 
         const {token} = req.body;
         const role = req.role 
         // console.log("fcm token",token)
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


const fetchCitizenAllNotifications = async(req,res)=>{
    try {
          const citizenId = req.user 
          const citizen = await Citizen.findById(citizenId)
          if(!citizen){
            return Response(res,404,"Citizen not found")
          }
          const notifications = await Notification.find({receiverId:citizenId}).sort({createdAt:-1})
          if(notifications.length === 0){
             return Response(res,200,"No notifications found",notifications)
          }else{
             return Response(res,200,"Notifications found",notifications)
          }
    } catch (error) {
        console.error("failed to get citizen notifications")
        return Response(res,500,"Internal server error")
    }
}
const MarkReadCitizenNotifications = async(req,res)=>{
   try {
       const citizenId = req.user
       const citizen = await Citizen.findById(citizenId)
       if(!citizen){
         return Response(res,404,"User Not found")
       }
       await Notification.updateMany(
         {receiverId:citizenId,receiverRole:"citizen",isRead:false},{$set:{isRead:true}}
      )
       return Response(res,200,"All Notifications marked as read")
   } catch (error) {
      console.log("failed to marked notifications",error)
      return Response(res,500,"Internal server error")
   }
}

const fetchMcAdminAllnotifications = async(req,res)=>{
     try {
          const mcId = req.user 
          const mcadmin = await McModel.findById(mcId)
          if(!mcadmin){
            return Response(res,404,"Mc admin not found")
          }
          const notifications = await Notification.find({receiverId:mcId}).sort({createdAt:-1})
          if(notifications.length === 0){
             return Response(res,200,"No notifications found",notifications)
          }else{
             return Response(res,200,"Notifications found",notifications)
          }
     } catch (error) {
        console.error("failed to get mc admin notifications")
        return Response(res,500,"Internal server error")
     }
}

const MarkReadMcNotifications = async(req,res)=>{
   try {
       const mcId = req.user
      //  console.log("MCId",mcId)
       const mcadmin = await McModel.findById(mcId)
       if(!mcadmin){
         return Response(res,404,"Not found")
       }
       await Notification.updateMany(
         {receiverId:mcId,receiverRole:"mc",isRead:false},{$set:{isRead:true}}
      )
       return Response(res,200,"All Notifications marked as read")
   } catch (error) {
      console.log("failed to marked notifications",error)
      return Response(res,500,"Internal server error")
   }
}

module.exports = {SaveFCMToken,fetchCitizenAllNotifications,fetchMcAdminAllnotifications,MarkReadMcNotifications,MarkReadCitizenNotifications}