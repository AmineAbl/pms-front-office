const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { processCheckOut, getStatement } = require('../controllers/checkoutController');

router.get('/:bookingId/statement', auth, getStatement);
router.post('/:bookingId', auth, authorizeRoles('admin', 'manager', 'receptionist'), processCheckOut);

module.exports = router;
