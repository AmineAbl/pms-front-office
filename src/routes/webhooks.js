const express = require('express');
const router = express.Router();
const controller = require('../controllers/webhookController');

router.post('/room-status', controller.receiveRoomStatus);

module.exports = router;
