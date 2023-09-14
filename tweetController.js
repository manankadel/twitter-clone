// controllers/tweetController.js
const Tweet = require('../models/tweet');

// Create a new tweet
exports.createTweet = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id; // Assuming you have user data in req.user after authentication

    // Create a new tweet
    const tweet = new Tweet({
      content,
      author: userId,
    });

    // Save the tweet to the database
    await tweet.save();

    res.status(201).json({ tweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get tweets by a specific user
exports.getTweetsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch tweets by the specified user
    const tweets = await Tweet.find({ author: userId }).sort('-timestamp');

    res.status(200).json({ tweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get tweets from users the logged-in user follows (timeline)
exports.getTimeline = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user data in req.user after authentication

    // Fetch tweets from followed users
    const tweets = await Tweet.find({ author: { $in: req.user.following } }).sort('-timestamp');

    res.status(200).json({ tweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Inside your tweetController.js

const Tweet = require('../models/tweet');
const User = require('../models/user');
const io = require('../app'); // Import the initialized Socket.io instance

// Create a new tweet
exports.createTweet = async (req, res) => {
  try {
    // ... (previous code to create a tweet)

    // Broadcast the new tweet to followers in real-time
    const tweetWithAuthor = await Tweet.findById(tweet._id).populate('author', 'username');
    const followers = req.user.followers; // Assuming you have a followers array for users

    followers.forEach((followerId) => {
      io.to(followerId).emit('newTweet', tweetWithAuthor);
    });

    res.status(201).json({ tweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
