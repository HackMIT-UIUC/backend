const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const Post = require('../../models/Posts')
const Comment = require('../../models/Comments')

// @route  POST api/comments
// @desc   Add a comment to an existing post
// @access Private
// Crud stuff here
router.post('/', [
  check('message', 'comment content is required').not().isEmpty(),
],
async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const post = await Post.findOne({ postID: req.params.id });

        const newComment = new Comment({
            commentNumber : post.comments == undefined ? 1 : post.comments.length,
            postID: req.body["postID"],
            username: req.body["username"],
            picture: req.body["picture"],
            likes: req.body["likes"],
            message: req.body["message"]
        })
        const comment = await newComment.save();
        //Find comment array of the post
        const oldComments = await Post.find({ postID: req.params.id }, 'comments');
        //Add the comment to the post
        oldComments.push(comment.commentNumber);
        const update = { comments: oldComments };
        const post = await Post.findOneAndUpdate({ postID: req.params.id }, update);

        res.json(post);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route  POST api/post
// @desc   Update a comment
// @access Private
// Crud stuff here
router.post('/:id/:commentNumber', [
    check('message', 'comment content is required').not().isEmpty(),
  ],
  async (req, res) => {
      const error = validationResult(req);
      if(!error.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      }
      try {
            const filter = { postID: req.params.id, commentNumber: req.params.commentNumber};

            const post = await Comment.findOne(filter)
            if(!req.body("picture").isEmpty()){
                const update = { picture: req.body("picture") };
                const post = await Comment.findOneAndUpdate(filter, update);
            }
            if(!req.body("message").isEmpty()){
                const update = { picture: req.body("message") };
                const post = await Comment.findOneAndUpdate(filter, update);
            }

            res.json(post);
            console.log(req.body);
      } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }
  })

// @route  GET api/comments
// @desc   delete comment based on post id and comment number
// @access Private
router.get("/delete/:id/:commentNumber", async (req, res) => {
	try {
        //Find comment
		const comment = await Comment.findOneAndDelete({postID: req.params.id, commentNumber: req.params.commentNumber});
        //Find comment array of the post
        const oldComments = await Post.find({ postID: req.params.id }, 'comments');
        const index = array.indexOf(comment.commentNumber);
        //Delete the comment from the post
        if (index > -1){            
            oldComments.splice(index, 1);
            const update = { comments: oldComments };
            const post = await Post.findOneAndUpdate({ postID: req.params.id }, update);
        }
        res.send(comment);
	} catch {
		res.status(404)
		res.send({ error: "Comment doesn't exist!" })
	}
})

// @route  POST api/post
// @desc   Remove a like from a comment
// @access Private
// Crud stuff here
router.post('unlike/:id/:commentNumber', async (req, res) => {
    try {
          const filter = { postID: req.params.id, commentNumber: req.params.commentNumber};

          const comment = await Comment.findOne({ postID: req.params.id, commentNumber: req.params.commentNumber});
          
          if(comment.likes > 0){
            const update = { likes: comment.likes - 1 };
            const updatedComment = await Post.findOneAndUpdate({ postID: req.params.id }, update);
          }else
            res.status(400).send('Can\'t unlike a comment with no likes');
          res.json(updatedPost);
          console.log(req.body);
    } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
    }
}) 

// @route  POST api/post
// @desc   Add a like to a comment
// @access Private
// Crud stuff here
router.post('like/:id/:commentNumber', async (req, res) => {
      try {
            const filter = { postID: req.params.id, commentNumber: req.params.commentNumber};

            const comment = await Comment.findOne({ postID: req.params.id, commentNumber: req.params.commentNumber});
            const update = { likes: comment.likes + 1 };
            const updatedComment = await Comment.findOneAndUpdate({ postID: req.params.id }, update);
            res.json(updatedComment);
            console.log(req.body);
      } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
      }
  })

module.exports = router;
