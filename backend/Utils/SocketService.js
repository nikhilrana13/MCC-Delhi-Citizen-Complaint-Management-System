const { Server } = require("socket.io")


let io; 

const initializeSocket = (server)=>{
    const io = new Server(server,{
        cors:{
            origin:process.env.NEXT_FRONTEND_URL,
            credentials:true,
            methods:["GET", "POST", "PUT", "PATCH", "DELETE"]
        },
        pingTimeout:60000
    })
    // when a new socket connection is established 
    io.on("connection",(socket)=>{
     console.log(`user connected${socket.id}`);
    socket.on("join",(userId)=>{
        socket.join(userId);
        console.log(`User ${userId} joined room `)
    });
     socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
    })
    return io
}

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {initializeSocket,getIO}