const mongoose  = require("mongoose")

const CitizenSchema = mongoose.Schema({
    type:{type:String,enum:["local","google"],default:"local"},
    name:{type:String,required:true},
    email:{type:String,required:true},
    uid:{type:String,default:""},
    password:{type:String,required:true},
    phonesuffix:{type:String,default:""},
    phonenumber:{type:String, default:""},
    address:{type:String,default:""},
    mycomplaints:[{type:mongoose.Schema.Types.ObjectId,ref:"Complaints"}],
    role:{type:String,default:"citizen"},
    isVerified:{type:Boolean,default:false},
    profilepic:{type:String,default:""}
},{timestamps:true})

const Citizen = mongoose.model("Citizen",CitizenSchema)
module.exports = Citizen 