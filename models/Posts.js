const mongoose = require('mongoose');
const Schema = require.Schema;

const PostSchema = new  mongoose.Schema({
    postID: {
        type: Number,
        required: true,
        unique: true
    },
    /*
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },*/
    username: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
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
    symptoms: {
        type: Array,
        required: true,
        validate : {
            validator : function(array) {
              return array.length > 0 && array.every((v) => typeof v === 'string');
            }
        }
    }
}); 

module.exports = mongoose.model('post', PostSchema);
