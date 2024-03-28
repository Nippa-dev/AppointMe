const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "passwd is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isOwner: {
        type: Boolean,
        default: false
    },
    notification: {
        type: Array,
        default: [],
    }, seennotification: {
        type: Array,
        default: [],
    }
});

const userModel = mongoose.model("users", userSchema)
module.exports = userModel


