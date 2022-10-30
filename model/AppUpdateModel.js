const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const appupdateSchema = new mongoose.Schema({
    index:{
        type: Number,
        required: true
    },
    AppVersion: {
        type: String,
        required: true
    },
    PlayStoreUpdateLink: {
        type: String,
        required: true
    },
    ExternalUpdateLink: {
        type: String,
        required: true
    },
    UpdateLevel: {
        type: String,
        required: true
    },
    UpdateReason: {
        type: String,
        required: true
    },
    AppSign: {
        type: String,
        required: true
    },
    Others: {
        type: String,
        required: true
    },
})

module.exports = AppUpdate = mongoose.model('appupdates', appupdateSchema);