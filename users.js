// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Follow a user
router.post('/follow/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user._id;

    if (userId === loggedInUserId.toString()) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    // Find the target user and update their followers list
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the logged-in user is already following the target user
    if (!targetUser.followers.includes(loggedInUserId)) {
      targetUser.followers.push(loggedInUserId);
      await targetUser.save();
    }

    // Update the logged-in user's following list
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser.following.includes(userId)) {
      loggedInUser.following.push(userId);
      await loggedInUser.save();
    }

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unfollow a user
router.delete('/unfollow/:userId', async

// routes/users.js
// ...

// Update user profile information
router.put('/update-profile', async (req, res) => {
  try {
    const { username, bio } = req.body;
    const loggedInUserId = req.user._id;

    // Find the logged-in user and update their profile information
    const user = await User.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.bio = bio;

    // Handle profile picture upload separately if needed
    // You can use a library like Multer to handle file uploads

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...

// routes/users.js
// ...

// Follow a user
router.post('/follow/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user._id;

    // Update the logged-in user's following list to include the target user
    // Update the target user's followers list to include the logged-in user

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unfollow a user
router.delete('/unfollow/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user._id;

    // Remove the target user from the logged-in user's following list
    // Remove the logged-in user from the target user's followers list

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...
