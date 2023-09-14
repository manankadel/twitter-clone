// routes/tweets.js
const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new tweet (requires authentication)
router.post('/', authMiddleware, tweetController.createTweet);

// Get tweets by a specific user
router.get('/user/:userId', tweetController.getTweetsByUser);

// Get tweets from users the logged-in user follows (requires authentication)
router.get('/timeline', authMiddleware, tweetController.getTimeline);

module.exports = router;

// routes/tweets.js
const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

// Edit a tweet (requires authentication)
router.put('/:tweetId', authMiddleware, tweetController.editTweet);

module.exports = router;


// routes/tweets.js
const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

// Delete a tweet (requires authentication)
router.delete('/:tweetId', authMiddleware, tweetController.deleteTweet);

module.exports = router;

// routes/tweets.js
// ...

// Fetch tweets by username
router.get('/user/:username', async (req, res) => {
    try {
      const { username } = req.params;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch tweets created by the user
      const tweets = await Tweet.find({ user: user._id });
  
      res.json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ...

  // routes/tweets.js
// ...

// Fetch timeline tweets for the logged-in user
router.get('/timeline', async (req, res) => {
    try {
      // Get the logged-in user's ID from req.user
      const userId = req.user._id;
  
      // Fetch tweets from users that the logged-in user is following
      const tweets = await Tweet.find({ user: { $in: [userId, ...user.following] } })
        .sort({ createdAt: -1 });
  
      res.json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ...
  
  // routes/tweets.js
const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');

// Like a tweet
router.post('/like/:tweetId', async (req, res) => {
  try {
    const { tweetId } = req.params;
    const loggedInUserId = req.user._id;

    // Find the tweet and update its likes list
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (!tweet.likes.includes(loggedInUserId)) {
      tweet.likes.push(loggedInUserId);
      await tweet.save();
    }

    res.json({ message: 'Tweet liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unlike a tweet
router.delete('/unlike/:tweetId', async (req, res) => {
  try {
    const { tweetId } = req.params;
    const loggedInUserId = req.user._id;

    // Find the tweet and remove the logged-in user from its likes list
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    tweet.likes = tweet.likes.filter(
      (likerId) => likerId.toString() !== loggedInUserId.toString()
    );
    await tweet.save();

    res.json({ message: 'Tweet unliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retweet a tweet
router.post('/retweet/:tweetId', async (req, res) => {
  try {
    const { tweetId } = req.params;
    const loggedInUserId = req.user._id;

    // Find the tweet and update its retweets list
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (!tweet.retweets.includes(loggedInUserId)) {
      tweet.retweets.push(loggedInUserId);
      await tweet.save();
    }

    res.json({ message: 'Tweet retweeted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unretweet a tweet
router.delete('/unretweet/:tweetId', async (req, res) => {
  try {
    const { tweetId } = req.params;
    const loggedInUserId = req.user._id;

    // Find the tweet and remove the logged-in user from its retweets list
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    tweet.retweets = tweet.retweets.filter(
      (retweeterId) => retweeterId.toString() !== loggedInUserId.toString()
    );
    await tweet.save();

    res.json({ message: 'Tweet unretweeted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// routes/tweets.js
const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');

// Create a new tweet
router.post('/create', async (req, res) => {
  try {
    const { content } = req.body;
    const loggedInUserId = req.user._id;

    // Create a new tweet and associate it with the logged-in user
    const tweet = new Tweet({
      content,
      author: loggedInUserId,
    });

    await tweet.save();

    res.json({ message: 'Tweet created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// routes/tweets.js
const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');

// Fetch tweets from followed users for the logged-in user's timeline
router.get('/timeline', async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch tweets from users the logged-in user follows
    // Sort the tweets by timestamp in descending order

    res.json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
