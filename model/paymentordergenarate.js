const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseid: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    orderid: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    expire_at: {type: Date, default: Date.now, expires: 864000}
    
}, { timestamps: true });


module.exports = Order = mongoose.model('orders', orderSchema);