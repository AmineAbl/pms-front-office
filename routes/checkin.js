const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { processCheckIn, getCheckInDetails, getProforma, cancelCheckIn } = require('../controllers/checkinController');

router.get('/:bookingId', auth, getCheckInDetails);
router.get('/:bookingId/proforma', auth, getProforma);
router.post('/:bookingId', auth, authorizeRoles('admin', 'manager', 'receptionist'), processCheckIn);
router.delete('/:bookingId', auth, authorizeRoles('admin', 'manager', 'receptionist'), cancelCheckIn);

module.exports = router;
