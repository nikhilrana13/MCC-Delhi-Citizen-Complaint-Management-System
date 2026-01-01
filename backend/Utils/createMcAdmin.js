const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const McModel = require("../Models/McModel")
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })



const createMc = async()=>{
    try {
         if (!process.env.MC_EMAIL || !process.env.MC_PASSWORD) {
             console.log("MC_EMAIL and MC_PASSWORD must be set in .env")
             process.exit(1)
         }
         await mongoose.connect(process.env.MONGO_URL);

         const mcExists = await McModel.findOne({role:"mc"})
         if(mcExists){
            console.log("Mc Already exists")
            return;
         }
         const hashpassword = await bcrypt.hash(process.env.MC_PASSWORD,10)
         const normalizedEmail = process.env.MC_EMAIL.toLowerCase().trim()
         const Mcadmin = await McModel.create({
             Mcname:"Mc Delhi",
             email: normalizedEmail,
             password:hashpassword,
             role:"mc"
         })
           Mcadmin.isVerified = true
           await Mcadmin.save()
          console.log("Mc admin created successfully")
          process.exit()
    } catch (error) {
        console.log("failed to create Mc admin",error);
        process.exit(1);
    }
}
createMc()
