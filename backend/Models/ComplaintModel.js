const mongoose = require("mongoose")



const ComplaintSchema = mongoose.Schema({
    citizenId:{type:mongoose.Schema.Types.ObjectId,ref:"Citizen",required:true},
    mcId:{type:mongoose.Schema.Types.ObjectId,ref:"McModel",required:true},
    title:{type:String,required:true,trim:true,minlength:10,maxlength:100},
    description:{type:String,required:true,minlength:10,maxlength:1500},
    status:{type:String,enum:["pending","review","progress","completed","cancelled"],default:"pending"},
    images:[{type:String,default:""}],
    category:{type:String,enum:["road","water","electricity","garbage","streetlight","parks","other"],default:"other"},
    address:[{
        location:{type:String,required:true},
        landmark:{type:String,},
        ward:{type:String},
        zone:{type:String}
    }],
    assignedTo:{type:String},
},{timestamps:true})


// indexes for query optimization
ComplaintSchema.index({citizenId:1,createdAt: -1}),
ComplaintSchema.index({status:1})
ComplaintSchema.index({category:1})
ComplaintSchema.index({createdAt: -1})


const Complaint = mongoose.model("Complaint",ComplaintSchema)
module.exports = Complaint