const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const ProductReviewSchema = new mongoose.Schema({
    ProductId: {
        type: String,
        required: true
    },
    
    Enrollusers:[{
        Customeruniqueid: {
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true,
            //unique: true
        },
        buydate:{
            type: String,
            required: true,
        },
        review:{
            type: String,
            required: true,
        },
        rating:{
            type: String,
            required: true,
        },
    }],
})

module.exports = productreviews = mongoose.model('productreviews', ProductReviewSchema);