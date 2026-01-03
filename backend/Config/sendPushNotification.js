


const sendPushNotification = async(token,title,body,data={})=>{
    if(!token) return null
    try {
         const response = await admin.messaging().send({
            token,
            notification:{
                title,
                body
            },
            data,
            android: {
                    priority: "high"
            }
         })
        console.log("Push notification sent:", response);
       return response;
    } catch (error) {
        console.error("Failed to send push notification:", error.message);
        return null;
        
    }
}

module.exports = sendPushNotification