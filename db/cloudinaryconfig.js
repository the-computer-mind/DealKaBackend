const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});



try {cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USER_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
});
} catch (err) {
    console.log(err);
}

module.exports = cloudinary;