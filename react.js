import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://your-backend-server-url'); // Replace with your backend server URL

function TweetList() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // Listen for new tweets in real-time
    socket.on('newTweet', (newTweet) => {
      setTweets((prevTweets) => [newTweet, ...prevTweets]);
    });

    // Cleanup when the component unmounts
    return () => {
      socket.off('newTweet');
    };
  }, []);

  // Render tweets
  return (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet._id}>{tweet.content}</div>
      ))}
    </div>
  );
}

export default TweetList;
