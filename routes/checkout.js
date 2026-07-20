const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { processCheckOut, getStatement } = require('../controllers/checkoutController');

router.get('/:bookingId/statement', getStatement);
router.post('/:bookingId', auth, processCheckOut);

module.exports = router;
