const CitizenMapper = require("../Mappers/CitizenMapper.js")
const McMapper = require("../Mappers/McMapper.js")
const Citizen = require("../Models/CitizenModel.js")
const McModel = require("../Models/McModel.js")
const Mc = require("../Models/McModel.js")
const Response = require("../Utils/ResponseHandler.js")
const bcrypt = require("bcrypt")
const { validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")


// register citizen
 const RegisterCitizen = async(req,res)=>{
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Response(res, 400, "Validation failed", errors.array());
        }
         const {email,password,name} = req.body 
        // check if user already exists or not 
        let user = await Citizen.findOne({email})
        if(!user){
                 const hashpassword = await bcrypt.hash(password,10)
                 user = await Citizen.create({
                    email,
                    password:hashpassword,
                    name,
                 })
                 return Response(res,200,"Sign up successfully",CitizenMapper(user))
        }else{
            return Response(res,409,"User Already Exists")
        }
    } catch (error) {
        console.error("failed to sign up",error)
        return Response(res,500,"Internal server error")
    }
 }

// login (for both citizen and mc)
 const Login = async(req,res)=>{
    try {
         // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Response(res, 400, "Validation failed", errors.array());
        }
        const {email,password} = req.body
        // Normalize email for consistent lookup
        const normalizedEmail = email.toLowerCase().trim()
        // check user exists or not in Citizen first
        let user = await Citizen.findOne({email: normalizedEmail})
        let isMc = false
        if(!user){
            // check in Mc
            user = await McModel.findOne({email: normalizedEmail})
            isMc = true
        }
        if(!user){
            return Response(res,404,"User not found please Register")
        }else{
             const isMatch = await bcrypt.compare(password,user.password)
             if(!isMatch){
                return Response(res,401,"Invalid Credentials")
             }
            // generate jwt
            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
            if(isMc){
                user.isVerified = true
                await user.save()
                return Response(res,200,"Login Successfully",{ user:McMapper(user),token})
            }else{
                user.isVerified = true
                await user.save()
                return Response(res,200,"Login Successfully",{user:CitizenMapper(user),token})
            }
        }
    } catch (error) {
        console.error("failed to Login",error)
        return Response(res,500,"Internal server error")
    }
 }
//  Login with google using firebase
 const LoginWithgoogle = async(req,res)=>{
    try {
        const {uid,name,email,picture} = req.user
        //  console.log("req.user",req.user) 
        // Normalize email
        const normalizedEmail = email.toLowerCase().trim()
        let user = await Citizen.findOne({email: normalizedEmail})
        if(!user){
            user = await Citizen.create({
                type: "google",
                uid,
                name,
                email: normalizedEmail,
                profilepic: picture
            })
        }
            // console.log("user logged in with google",user)
            user.isVerified = true
            await user.save()
         // generate jwt
         const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
         res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
         return Response(res,200,"Login successfully",{user:CitizenMapper(user),token}) 
    } catch (error) {
        console.error("failed to log in with google",error)
         return Response(res,500,"Internal server error")
    }
 }

// logout 
 const Logout = async(req,res)=>{
    try {
        const userId = req.user
        const role = req.role 
      
         const model = role === 'citizen' ? Citizen : McModel
        //  remove fcm token on logout
         await model.findByIdAndUpdate(userId,{
            $unset:{fcmtoken:""}
         })
         res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"})
         return Response(res,200,"Logout successfully")
    } catch (error) {
         console.error("failed to logout",error)
        return Response(res,500,"Internal server error")
    }
 }


 module.exports = {RegisterCitizen,Login,LoginWithgoogle,Logout}

