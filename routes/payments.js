const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDayPayments } = require('../controllers/paymentController');

router.get('/', auth, getDayPayments);

module.exports = router;