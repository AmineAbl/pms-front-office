const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { getAllRooms, getRoomById, updateRoomStatus, updateStatusByNumero, getRoomsByStatus } = require('../controllers/roomController');

router.get('/', getAllRooms);
router.get('/status/:status', getRoomsByStatus);
router.patch('/numero/:numero/status', auth, authorizeRoles('admin', 'manager', 'housekeeping_supervisor'), updateStatusByNumero);
router.get('/:roomId', getRoomById);
router.patch('/:roomId/status', auth, authorizeRoles('admin', 'manager', 'housekeeping_supervisor'), updateRoomStatus);

module.exports = router;
