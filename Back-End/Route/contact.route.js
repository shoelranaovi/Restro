const express = require('express');
const router = express.Router();


// Middleware (you'll need to create these)
const { createContact } = require('../controller/contact.controller');

// Public routes
router.post('/', createContact);

// Admin routes
// router.get('/', auth, adminAuth, getAllContacts);
// router.get('/stats', auth, adminAuth, getContactStats);
// router.get('/:contactId', auth, adminAuth, getContactById);
// router.put('/:contactId/reply', auth, adminAuth, replyToContact);
// router.patch('/:contactId/status', auth, adminAuth, updateContactStatus);
// router.delete('/:contactId', auth, adminAuth, deleteContact);

module.exports = router;