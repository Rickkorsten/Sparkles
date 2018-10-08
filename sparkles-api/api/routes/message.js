const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../auth/check-auth');
const Message = require('../models/Message');

const messageController = require('../controllers/message')

// protected routes
router.get('/', checkAuth, messageController.message_get_all);
router.post('/', checkAuth, messageController.message_create);
router.delete('/:messageId', messageController.message_delete);
router.patch('/:messageId', messageController.message_update);
router.get('/:messageId', messageController.message_get_by_id);

module.exports = router