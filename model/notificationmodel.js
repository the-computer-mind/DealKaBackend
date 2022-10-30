const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const notificationSchema = new mongoose.Schema({
    
    lastupdatetime: {
        type:String,
        required: true
    },
    notifications:[{
        lastupdatetime: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        uploadId: {
            type: String,
            required: true
        },
        placename: {
            type: String,
            required: true
        },
        eventitle: {
            type: String,
            required: true
        },
    }],
    name:{
        type: String,
        required: true
    },
    expire_at: {type: Date, default: Date.now, expires: 100}
    
}, { timestamps: true })

module.exports = Notification = mongoose.model('notifications', notificationSchema);