const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const AddNewMusicCatagorySchema = new mongoose.Schema({
    index:{
        type: String,
        required: true
    },
    Catagory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Thumbnail_link: {
        type: String,
        required: true
    },
    MusicCataID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
})

module.exports = AddMusicCatagory = mongoose.model('MusicCatagory', AddNewMusicCatagorySchema);