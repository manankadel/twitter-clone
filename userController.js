// controllers/userController.js
const User = require('../models/user');

// Get user profile by username
exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
    try {
      const { userIdToFollow } = req.params;
      const currentUser = req.user; // Assuming you have user data in req.user after authentication
  
      // Add the userIdToFollow to the currentUser's following list
      currentUser.following.push(userIdToFollow);
      await currentUser.save();
  
      res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Unfollow a user
  exports.unfollowUser = async (req, res) => {
    try {
      const { userIdToUnfollow } = req.params;
      const currentUser = req.user; // Assuming you have user data in req.user after authentication
  
      // Remove the userIdToUnfollow from the currentUser's following list
      currentUser.following = currentUser.following.filter(
        (id) => id !== userIdToUnfollow
      );
      await currentUser.save();
  
      res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  // controllers/userController.js
const User = require('../models/user');

// Get followers of a user
exports.getUserFollowers = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the followers of the user
    const followers = await User.find({ _id: { $in: user.followers } });

    res.status(200).json({ followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
