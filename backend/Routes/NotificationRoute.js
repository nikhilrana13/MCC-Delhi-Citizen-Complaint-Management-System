const express = require('express');
const IsAnyAuth = require('../Middleware/IsAnyAuth');
const SaveFCMToken = require('../Controllers/NotificationController');
const router = express.Router();


router.post("/save-token",IsAnyAuth,SaveFCMToken)

module.exports = router