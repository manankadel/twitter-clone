// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/twitter-clone-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const authRoutes = require('./routes/auth'); // Create this file later
const tweetRoutes = require('./routes/tweets'); // Create this file later

app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const app = express();

// ... (previous setup code)

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// ... (configure MongoDB, routes, and middleware)

// Socket.io logic here

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
