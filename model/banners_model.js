const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const bannerSchema = new mongoose.Schema({
    
    OuterBannerId: {
        type: String,
        required: true
    },
    banners_id: [{
        type: String,
        required: true
    }],
    banners_type: [{
        type: String,
        required: true
    }],
    banners_title: [{
        type: String,
        required: true
    }],
    banners_description: [{
        type: String,
        required: true
    }],
    banners_extlink: [{
        type: String,
        required: true
    }],
    banners_thumbnail_link: [{
        type: String,
        required: true
    }],
    banners_fromdate: [{
        type: String,
        required: true
    }],
    banners_todate: [{
        type: String,
        required: true
    }],
    banners_data: [{
        type: String,
        required: true
    }],
})

module.exports = Banner = mongoose.model('banners', bannerSchema);