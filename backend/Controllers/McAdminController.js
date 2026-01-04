const cloudinary = require("../Config/cloudinary.js")
const Response = require("../Utils/ResponseHandler.js")
const McModel = require("../Models/McModel.js")
const McMapper = require("../Mappers/McMapper.js")




const GetMcProfile = async(req,res)=>{
    try {
         const mcId = req.user 
         const mcadmin = await McModel.findById(mcId)
         if(!mcadmin){
            return Response(res,404,"Mc not found")
         }
         return Response(res,200,"profile fetch successfully",McMapper(mcadmin))
        
    } catch (error) {
        console.error("failed to fetch profile",error)
        return Response(res,500,"Internal server error")
    }
}

const UpdateMcProfile = async(req,res)=>{
    try { 
         const mcId = req.user 
         const {Mcname} = req.body 
         const file = req.file
        //  console.log("file:", file);
         const mcadmin = await McModel.findById(mcId)
         if(!mcadmin){
            return Response(res,404,"Mc not found")
         }
         let updateData = {}
         if(Mcname) updateData.Mcname = Mcname 
         if(file){
            //convert image to base64 
            const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
            //upload to cloudinary
            const cloudResponse = await cloudinary.uploader.upload(imageBase64,{
                folder:"mcc-delhi-complaints",
                resource_type:"image"
            })
            // get secure url from cloudinary
            updateData.profilepic = cloudResponse.secure_url
         }
        //if no data to update
        if(Object.keys(updateData).length === 0){
            return Response(res,400,"No fields provided to update")
        }
        const updateuser = await McModel.findByIdAndUpdate(mcId,{$set:updateData},{new:true})
        return Response(res,200,"Profile update successfully",(McMapper(updateuser)))
    } catch (error) {
        console.error("failed to update profile",error)
        return Response(res,500,"Internal server error")
    }
} 

module.exports = {GetMcProfile,UpdateMcProfile}