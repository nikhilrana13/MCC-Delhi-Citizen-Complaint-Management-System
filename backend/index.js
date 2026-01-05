const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const authRoutes = require('./Routes/AuthRoutes');
const complaintRoutes = require('./Routes/ComplaintRoutes')
const notificationRoute = require('./Routes/NotificationRoute.js')
const citizenRoute = require('./Routes/CitizenRoutes')
const mcadminRoute = require('./Routes/McAdminRoute')
const http = require("http")
const {initializeSocket} = require("./Utils/SocketService.js")


dotenv.config()

const PORT = process.env.PORT || 5000 
const app = express() 


// middleware 
app.use(cors({
    origin:process.env.NEXT_FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// create socket io server 
const server = http.createServer(app)
const io = initializeSocket(server)



// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/complaint',complaintRoutes)
app.use('/api/notification',notificationRoute)
app.use('/api/citizen',citizenRoute)
app.use('/api/mcadmin',mcadminRoute)

// connect to database 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log("failed to connect to db",error)
})

// app.use("/",(req,res)=>{
//     res.send("server is running")
// })

server.listen(PORT,(()=>{
    console.log(`Server is running on ${PORT}`)
}))