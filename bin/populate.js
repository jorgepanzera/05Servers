const Chance = require('chance');
const Post = require("../models/post.model");

const populateDatabase = async (numberOfPosts) => {
  try {
    // Clear existing posts from the database
    await Post.deleteMany();

    const posts = [];
    const chance = new Chance();

    for (let i = 0; i < numberOfPosts; i++) {
      const post = new Post({
        title: chance.sentence({ words: 5 }),
        text: chance.paragraph(),
        author: chance.name(),
      });

      posts.push(post);
    }

    // Insert the generated posts into the database
    await Post.insertMany(posts);

    console.log(`${numberOfPosts} posts creados en memory database.`);
  } catch (error) {
    console.error('Error populateDatabase:', error);
  }
};

module.exports = populateDatabase
