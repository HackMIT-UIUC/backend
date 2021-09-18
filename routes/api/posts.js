const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const Post = require('../../models/Posts')
// @route  POST api/post
// @desc   Create a post
// @access Private

//CRUD stuff here

router.post('/', [
  check('message', 'post content is required').not().isEmpty(),
],
(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newPost = new Posts({
            postID: req.body["postID"],
            username: req.body["username"],
            message: req.body["message"],
            symptomps: req.body["symptomps"],
        })
        const post = newPost.save();
        res.json(post);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
//
module.exports = router;
