const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection setup with Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes setup
const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweets');
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
