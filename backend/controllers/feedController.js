const Feed = require('../models/Feed');

// Get all posts from the feed
exports.getFeed = async (req, res) => {
  try {
    const feed = await Feed.find();
    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed' });
  }
};

// Add a new post to the feed
exports.addPost = async (req, res) => {
  const { content, user } = req.body;
  
  try {
    const newPost = new Feed({ content, user });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error adding post' });
  }
};
