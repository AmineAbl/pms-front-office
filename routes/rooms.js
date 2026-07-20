const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById, updateRoomStatus, updateStatusByNumero, getRoomsByStatus } = require('../controllers/roomController');

router.get('/', getAllRooms);
router.get('/status/:status', getRoomsByStatus);
router.patch('/numero/:numero/status', updateStatusByNumero);
router.get('/:roomId', getRoomById);
router.patch('/:roomId/status', updateRoomStatus);

module.exports = router;
