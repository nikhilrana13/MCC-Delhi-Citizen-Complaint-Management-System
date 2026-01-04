const express = require('express');
const IsAnyAuth = require('../Middleware/IsAnyAuth');
const {SaveFCMToken, fetchCitizenAllNotifications, fetchMcAdminAllnotifications} = require('../Controllers/NotificationController');
const IsCitizenAuth = require("../Middleware/IsCitizenAuth");
const IsMcAdminAuth = require('../Middleware/IsMcAdminAuth');
const router = express.Router();


router.post("/save-token",IsAnyAuth,SaveFCMToken)
router.get("/citizen-notifications",IsCitizenAuth,fetchCitizenAllNotifications)
router.get("/mc-notifications",IsMcAdminAuth,fetchMcAdminAllnotifications)

module.exports = router