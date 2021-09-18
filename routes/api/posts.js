const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const Post = require('../../models/Posts')
const Comment = require('../../models/Comments')

// @route  POST api/post
// @desc   Create a post
// @access Private
// Crud stuff here
router.post('/', [
  check('message', 'post content is required').not().isEmpty(),
],
async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newPost = new Post({
            postID: req.body["postID"],
            username: req.body["username"],
            title: req.body["title"],
            picture: req.body["picture"],
            likes: req.body["likes"],
            message: req.body["message"],
            symptoms: req.body["symptoms"],
        })
        const post = await newPost.save();
        res.json(post);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route  POST api/post
// @desc   Update a post
// @access Private
// Crud stuff here
router.post('/:id', [
    check('message', 'post content is required').not().isEmpty(),
  ],
  async (req, res) => {
      const error = validationResult(req);
      if(!error.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      }
      try {
            const filter = { postID: req.params.id };

            const post = await Post.findOne({ postID: req.params.id })
            if(!req.body("picture").isEmpty()){
                const update = { picture: req.body("picture") };
                const post = await Post.findOneAndUpdate({ postID: req.params.id }, update);
            }
            if(!req.body("message").isEmpty()){
                const update = { picture: req.body("message") };
                const post = await Post.findOneAndUpdate({ postID: req.params.id }, update);
            }
            if(!req.body("symptoms").isEmpty()){
                const update = { picture: req.body("symptoms") };
                const post = await Post.findOneAndUpdate({ postID: req.params.id }, update);
            }

            res.json(post);
            console.log(req.body);
      } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }
  })

//
// @route  GET api/post
// @desc   Retrieve post by its id
// @access Public
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ postID: req.params.id })
		console.log(req.params.id);
        res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

// @route  GET api/post
// @desc   Retrieve all posts by a user
// @access Public
router.get("/username/:username", async (req, res) => {
	try {
		const posts = await Post.find({ username: req.params.username })
        console.log(req.params.username)
        res.send(posts)
	} catch {
		res.status(404)
		res.send({ error: "User has no posts!" })
	}
})

//
// @route  GET api/post
// @desc   Retrieve comment based on post id and comment number
// @access Public
router.get("/:id/:commentNumber", async (req, res) => {
	try {
		const comment = await Comment.findOne({postID: req.params.id, commentNumber: req.params.commentNumber})
		console.log(req.params.id);
        res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Comment doesn't exist!" })
	}
})

// @route  GET api/post
// @desc   delete post based on the id
// @access Private
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
