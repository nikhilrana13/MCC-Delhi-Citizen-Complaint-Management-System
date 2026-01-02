const sharp = require("sharp")
const cloudinary = require("../Config/cloudinary")
const Citizen = require("../Models/CitizenModel")
const Complaint = require("../Models/ComplaintModel")
const Response = require("../Utils/ResponseHandler")
const McModel = require("../Models/McModel")




// Citizen complaint api's
const CreateComplaint = async(req,res)=>{
    try {
        const citizenId = req.user 
        let {title,description,address,category} = req.body 
        // console.log("req body",req.body)
        const files = req.files 
         // Validation: Check if all required fields are present
        if(!title || !description || !address || !category){
            return Response(res,403,"All fields are required")
        }
        // parse address to object if it comes as string
        if(typeof address === "string"){
            address = JSON.parse(address)
        }
        //check user exists or not 
        const user = await Citizen.findById(citizenId)
        if(!user){
            return Response(res,404,"User not found")
        }
        // find Mc
        const Mcadmin = await McModel.findOne({role:"mc"})

        // if have any images then upload to cloudinary and give url
        let imagesurl = []
        if(files && files.length > 0){
            for(let file of files ){
                try {
                    const optimizedImage = await sharp(file.buffer).resize({width:500,height:400}).webp({quality:80}).toBuffer();
                    const imagebase64 = `data:image/webp;base64,${optimizedImage.toString("base64")}`

                    const cloudResponse = await cloudinary.uploader.upload(imagebase64,{
                        folder:"mcc-delhi-complaints",
                        resource_type:"image"
                    });
                    imagesurl.push(cloudResponse.secure_url);
                } catch (error) {
                    console.log("cloudinary upload error",error)
                    return Response(res,500,"Image upload failed")
                }
            }
        }
        // create complaint
        const complaint = await Complaint.create({
            citizenId:citizenId,
            mcId:Mcadmin._id,
            title,
            description,
            address,
            category,
            images:imagesurl
        })
        // update complaint id to citizen mycomplaints array 
        user.mycomplaints.push(complaint._id)
        await user.save()
        // update complaint id to mc allcomplaints array
        Mcadmin.allcomplaints.push(complaint._id)
        await Mcadmin.save()
        return Response(res,201,"Complaint Created Successfully",complaint)
    } catch (error) {
        console.log("failed to create complaint",error)
        return Response(res,500,"Internal server error")
    }
}
// Get each Citizen complaint's
const EachCitizenComplaints = async(req,res)=>{
    try {
        const citizenId = req.user 
        const user = await Citizen.findById(citizenId)
        if(!user){
            return Response(res,404,"User not found")
        }
        const complaints = await Complaint.find({citizenId:citizenId}).sort({createdAt: -1})
        if(complaints.length === 0){
            return Response(res,200,"No Complaints found",complaints)
        }
        return Response(res,200,"Complaints found",complaints)
    } catch (error) {
        console.log("failed to get complaints",error)
        return Response(res,500,"Internal server error")
    }
}

module.exports = {CreateComplaint,EachCitizenComplaints}

