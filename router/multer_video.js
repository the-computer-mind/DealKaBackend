const multer = require("multer");
const path = require("path");
const cloudinary = require("../db/cloudinaryconfig");
const streamifier = require("streamifier");

//multer config
module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,"./router/multer_videos")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + " --- " + file.originalname)
        }
    }),
    
    fileFilter: (req, file, cb) => {
        console.log("krtkkkk");
        let ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".avi") {
            cb(new Error("file type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});