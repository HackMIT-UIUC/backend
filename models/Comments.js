const mongoose = require('mongoose');
const Schema = require.Schema;

const CommentSchema = new  mongoose.Schema({
    commentNumber: {
        type: Number,
        required: true,
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
    }
}); 

module.exports = mongoose.model('comment', CommentSchema);
