const mongoose = require("mongoose")


const notificationSchema = mongoose.Schema({
    complaintId:{type:mongoose.Schema.Types.ObjectId,ref:"Complaint",required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,required:true},
    receiverRole:{type:String,enum:["citizen","mc"],required:true},
    title:{type:String,required:true},
    message:{type:String,required:true},
    type:{type:String,enum:["complaint","status-update"],default:"complaint"},
    isRead:{type:Boolean,default:false}
},{timestamps:true})

// Performance index
notificationSchema.index({ receiverId: 1, isRead: 1 });
const Notification = mongoose.model("Notification",notificationSchema)
module.exports = Notification