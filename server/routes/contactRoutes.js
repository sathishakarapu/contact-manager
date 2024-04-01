const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define routes for contact management
router.post('/', contactController.createContact);
router.get('/', contactController.getAllContacts);
router.get('/search', contactController.searchContactsByName);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);
module.exports = router;
