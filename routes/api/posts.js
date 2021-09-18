const express = require('express');
const router = express.Router();
const Post = require("./models/Posts");

// @route  GET api/post
// @desc   Test route
// @access Public

//CRUD stuff here
router.get('/', (req, res) => res.send('Post route'));

// @route  GET api/post
// @desc   Retrieve post by its id
// @access Public
router.get("/post/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ postID: req.params.id })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

// @route  GET api/post
// @desc   Retrieve all posts by a user
// @access Public
router.get("/posts/:username", async (req, res) => {
	try {
		const posts = await Post.find({ username: req.params.username })
		res.send(posts)
	} catch {
		res.status(404)
		res.send({ error: "User has no posts!" })
	}
})

// @route  GET api/post
// @desc   delete post based on the id
// @access Public
router.get("/delete/:id", async (req, res) => {
	try {
		const post = await Post.findOneAndDelete({ postID: req.params.id })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = router;
