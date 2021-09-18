const mongoose = require('mongoose');
const Schema = require.Schema;

const postSchema = new  mongoose.Schema({
    postID: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    message: {
        type: String,
        minLength: 50,
        required: true
    },
    symptoms: {
        type: Array,
        required: true,
        validate : {
            validator : function(array) {
              return arrazy.length > 0 && array.every((v) => typeof v === 'string');
            }
        }
    }
}) 
