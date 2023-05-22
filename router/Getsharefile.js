const cluster = require("cluster");
const os = require("os");
const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cloudinary = require("../db/cloudinaryconfig");
const upload = require("./multer");
// const multer = require("multer");
// const upload = multer();

app.use(express.json());

require('../db/conn');
require('./jwt_auth');
const User = require('../model/userSchema');
const Product = require("../model/productSchema");
const Video = require("../model/video");
const Blog = require("../model/blogmodel");
const Course = require("../model/course");
const Buy = require("../model/BuyItemsModel");
const AddMusicCatagory = require("../model/addnewmusicctagorymodel");
const jwtauth = require('./jwt_auth');
const { json, response } = require('express');

try{router.post('/getsharefile',  async (req, res ) => {

    try {
    console.log("enteringggg to getsharefile");
    var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    console.log(req.header("authorization")+"hiii");
    console.log(req.header("size") + "hiii");
    var filter = req.header("filter");
    var searchquery = req.header("searchquery");
    var name = req.header("name");
    console.log(); //this is the productmodel coming from flutter
    console.log("req.body[1]");
      // var newHeaders = headers.split(",");
    const devicenum = newHeaders[0].slice(1, 2);
    console.log(devicenum);
    process.env.DeviceId=devicenum;
    process.env.jwt_token = newHeaders[1].slice(1,);
    console.log(process.env.jwt_token);
    process.env.jwt_retoken = newHeaders[2];
    process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
    // console.log(process.env.jwt_retoken);
    // console.log(typeof(headers));
    if (devicenum == 9) {
            res.status(401).send();
    }

    

    // const {alltoken} = req.get('Authorization');
    // console.log(process.env.jwt_token);
    // console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    // console.log(process.env.jwt_retoken);
    // console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    //verifying is the jwt valid
    var refer = await jwtauth();
    var verifyuser;
    try {
        const verifyUser = jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
        verifyuser = verifyUser;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            console.log("ookkk return from user object id verification");
            refer = false;
            console.log(err);
        }
    }
    console.log("ok back from jwtauth to logout");
    

    //removing the token from mongo db
    console.log(verifyuser);
    const user = await User.findOne({name:name});

    console.log("user");
    if (refer == true) {
        // console.log(User)
        if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
            console.log('under getsharefile');
            var count;
            const user = await User.findOne({ _id: verifyuser });
            var file;
            if(searchquery=="VideoData") {
                file = await Video.find({VideoId : filter},)
                
                
            } else if(searchquery=="CourseData") {
                file = await Course.find({CourseId : filter},);
            } else if(searchquery=="BlogData") {
                file = await Blog.find({BlogId : filter},);
            } else if(searchquery=="ProductData") {
                file = await Product.aggregate([
                    {$unwind: '$products'},
                    {$match: {'products.rating': { $gte: "0",$lte: "5"},'products.ProductId':filter}},]
                    )
            }
            console.log(file);
                
            res.status(201).send(file);
         
        
        
            }
            
        
                    
        } 
    else if (refer == false) {
        
        console.log("refresh block of logout.js");

        res.status(200).send("token code expire but refresh work");
        return;
    } else if (refer == 2) {
        
        console.log("done");
       
        try {
                if (devicenum == 0) {
                  console.log("yes jwt token is not expired");
                  const done = await User.updateOne({ "tokens.token": process.env.jwt_token }, //first previou one whch you want to remove 
                      { "$set": { "tokens.$.token": "null" } });
                  console.log(done);
                  const mdone = await User.updateOne({ "retokens.retoken": process.env.jwt_retoken },
                      { "$set": { "retokens.$.retoken": "null" } });
                  console.log(mdone);
                  
              } else if (devicenum == 1) {
                  console.log("user");
                  const done = await User.updateOne({ "tokens.0.md1token": process.env.jwt_token },
                      { "$set": { "tokens.0.md1token": "null" }, });
                  console.log(done);
                  const mdone = await User.updateOne({ "retokens.0.md1retoken": process.env.jwt_retoken },
                      { "$set": { "retokens.0.md1retoken": "null" } });
                  console.log(mdone);

              } else if (devicenum == 2) {
                  const done = await User.updateOne({ "tokens.0.md2token": process.env.jwt_token },
                      { "$set": { "tokens.0.md2token": "null" }, });
                  console.log(done);
                  const mdone = await User.updateOne({ "retokens.0.md2retoken": process.env.jwt_retoken },
                      { "$set": { "retokens.0.md2retoken": "null" }, });
                  console.log(mdone);

              } else if (devicenum == 3) {
                  const done = await User.updateOne({ "tokens.0.md3token": process.env.jwt_token },
                      { "$set": { "tokens.0.md3token": "null" }, });
                  console.log(done);
                  const mdone = await User.updateOne({ "retokens.0.md3retoken": process.env.jwt_retoken },
                  { "$set": { "retokens.0.md3retoken": "null" }, });
                  console.log(mdone);
              } else if (devicenum == 4) {
                  const done = await User.updateOne({ "tokens.0.md4token": process.env.jwt_token },
                      { "$set": { "tokens.0.md4token": "null" }, });
                  console.log(done);
                  const mdone = await User.updateOne({ "retokens.0.md4retoken": process.env.jwt_retoken },
                      { "$set": { "retokens.0.md4retoken": "null" } });
                  console.log(mdone);
              }
        } catch (err) {
            console.log(err)
        }
        // console.log("refresh block of logout.js");
        res.status(203).send("token code and refresh both expire");
        return;
        }
    } catch (err) {
        console.log(err);
    }


    //deleting the value from mongodb


    


    // if(!email || !password){
    //     return res.send.json({error: "plz type all field"});
    // };
    
});


    module.exports = router;
} catch (err) {
    console.log(err);
}