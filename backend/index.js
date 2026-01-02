const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const authRoutes = require('./Routes/AuthRoutes');
const complaintRoutes = require('./Routes/ComplaintRoutes')


dotenv.config()

const PORT = process.env.PORT || 5000 
const app = express()


// middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/complaint',complaintRoutes)




// connect to database 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log("failed to connect to db",error)
})

// app.use("/",(req,res)=>{
//     res.send("server is running")
// })

app.listen(PORT,(()=>{
    console.log(`Server is running on ${PORT}`)
}))