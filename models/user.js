const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    minutes: {
        type: Number
    },
    seconds: {
        type: Number
    }
});

module.exports = mongoose.model('User', userSchema);
