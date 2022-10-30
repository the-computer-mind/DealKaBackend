const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const liveSchema = new mongoose.Schema({
    EventId: {
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
    Ext_Link: {
        type: String,
        required: true
    },
    thumbnail_link: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    place:[{
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
        ]
    }],
})

module.exports = Live = mongoose.model('lives', liveSchema);