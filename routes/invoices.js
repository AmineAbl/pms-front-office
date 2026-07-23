const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDayInvoices } = require('../controllers/invoiceController');

router.get('/', auth, getDayInvoices);

module.exports = router;