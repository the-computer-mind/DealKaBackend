const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const OnlyproductSchema = new mongoose.Schema({
    ProductId: {
        type: String,
        required:true,
        unique:true,
    },
    type: {
        type: String,
        required:true,
    },
    catagory: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        required:true,
    },
    discount:{
        type: String,
        required:true,
    },
    discountedprice: {
        type: String,
        required:true,
    },
    listing: {
        type: String,
        required:true,
    },
    ProductName: {
    type: String,
    required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductStock: {
        type: Number,
        required: true
    },
    ProductImageUrl: {
        type: Array,
        required: true
    },
    state: {
        type: String,
        required:true
    },
    noofrating: {
        type: String,
        required:true
    },
    rating: {
        type: String,
        required:true
    },
    Date_Time: {
        type: String,
        required: true
    },
    ProductLink: {
        type: String,
        required: true
    }
});

//making the user data representation
const productSchema = new mongoose.Schema({
    userobjectid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true,
    },
    totalproduct: {
        type: Number,
        required:true
    },
    noofuserrating: {
        type: String,
        required:true,
    },
    userrating: {
        type: String,
        required:true,
    },
    products: [{
        ProductId: {
            type: String,
            required:true,
            unique:true,
        },
        type: {
            type: String,
            required:true,
        },
        catagory: {
            type: String,
            required:true,
        },
        status: {
            type: String,
            required:true,
        },
        discount:{
            type: String,
            required:true,
        },
        discountedprice: {
            type: String,
            required:true,
        },
        listing: {
            type: String,
            required:true,
        },
        ProductName: {
        type: String,
        required: true
        },
        ProductDescription: {
            type: String,
            required: true
        },
        ProductPrice: {
            type: Number,
            required: true
        },
        ProductStock: {
            type: Number,
            required: true
        },
        ProductImageUrl: {
            type: Array,
            required: true
        },
        state: {
            type: String,
            required:true
        },
        noofrating: {
            type: String,
            required:true
        },
        rating: {
            type: String,
            required:true
        },
        Date_Time: {
            type: String,
            required: true
        },
        ProductLink: {
            type: String,
            required: true
        }
    }],
})

module.exports = Product = mongoose.model('products', productSchema);