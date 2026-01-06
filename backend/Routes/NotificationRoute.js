const express = require('express');
const IsAnyAuth = require('../Middleware/IsAnyAuth');
const {SaveFCMToken, fetchCitizenAllNotifications, fetchMcAdminAllnotifications} = require('../Controllers/NotificationController');
const IsCitizenAuth = require("../Middleware/IsCitizenAuth");
const IsMcAdminAuth = require('../Middleware/IsMcAdminAuth');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const router = express.Router();


router.post("/save-token",AuthMiddleware,IsAnyAuth,SaveFCMToken)
router.get("/citizen-notifications",AuthMiddleware,IsCitizenAuth,fetchCitizenAllNotifications)
router.get("/mc-notifications",AuthMiddleware,IsMcAdminAuth,fetchMcAdminAllnotifications)

module.exports = router