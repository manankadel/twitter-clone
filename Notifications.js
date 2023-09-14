// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Fetch notifications for the logged-in user
router.get('/', async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch unread notifications for the logged-in user
    const notifications = await Notification.find({ recipient: loggedInUserId, read: false });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
