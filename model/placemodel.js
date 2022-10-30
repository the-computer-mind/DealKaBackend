const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const placeSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true
    },
    title: {
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
    location: {
        type: String,
        required: true
    },
    builddate: {
        type: String,
        required: true
    },
    photogalary: [
        {

        }
    ],
    PhotoGalleryText: [
        {

        }
    ],
    PhotoGalleryDescription: [
        {

        }
    ],
    PlaceId: {
        type: String,
        required: true
    },
})

module.exports = Place = mongoose.model('places', placeSchema);