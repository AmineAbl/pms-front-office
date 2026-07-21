const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { getFolio, addItem, updateItemVisibility, bulkUpdateVisibility, deleteItem } = require('../controllers/folioController');

router.get('/:folioId', getFolio);
router.post('/:folioId/items', auth, authorizeRoles('admin', 'manager', 'receptionist'), addItem);
router.patch('/:folioId/items/visibility', auth, authorizeRoles('admin', 'manager', 'receptionist'), bulkUpdateVisibility);
router.patch('/items/:itemId/visibility', auth, authorizeRoles('admin', 'manager', 'receptionist'), updateItemVisibility);
router.delete('/items/:itemId', auth, authorizeRoles('admin', 'manager'), deleteItem);

module.exports = router;
