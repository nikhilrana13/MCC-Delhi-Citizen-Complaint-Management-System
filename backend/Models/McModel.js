const mongoose  = require("mongoose")

const McSchema = mongoose.Schema({
    Mcname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"mc"},
    isVerified:{type:Boolean,default:false},
    profilepic:{type:String,default:""},
    allcomplaints:[{type:mongoose.Schema.Types.ObjectId,ref:"Complaint"}],
},{timestamps:true})

const McModel = mongoose.model("McModel",McSchema)
module.exports = McModel