const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const otpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    expire_at: {type: Date, default: Date.now, expires: 200}
    
}, { timestamps: true });


module.exports = Otp = mongoose.model('otps', otpSchema);