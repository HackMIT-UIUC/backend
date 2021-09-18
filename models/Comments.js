const mongoose = require('mongoose');
const Schema = require.Schema;

const CommentSchema = new  mongoose.Schema({
    commentNumber: {
        type: Number,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
    },
    likes: {
        type: Number,
    },
    message: {
        type: String,
        minLength: 1,
        required: true
    },
    postID: {
        type: Number,
        required: true,
        unique: true
    }
}); 

module.exports = mongoose.model('comment', CommentSchema);
