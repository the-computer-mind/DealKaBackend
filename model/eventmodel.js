const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const eventSchema = new mongoose.Schema({
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
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    isallday: {
        type:Boolean,
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

module.exports = Event = mongoose.model('events', eventSchema);