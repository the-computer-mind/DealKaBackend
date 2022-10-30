const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const multipletrySchema = new mongoose.Schema({
    
    number: {
        type: String,
        required: true,
        unique: true
    },
    trytimes: {
        type: Number,
        required: true,
    },
    otpentertimes: {
        required:true,
        type: Number,
    },
    expire_at: {type: Date, default: Date.now, expires: 7200*12} //7200=2hours
    
}, { timestamps: true });


module.exports = MultipleTry = mongoose.model('multipletry', multipletrySchema);