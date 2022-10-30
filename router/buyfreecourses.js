//
const crypto = require('crypto');
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const express = require('express');
const router = express.Router();
const app = express();
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const otpgenerator = require("otp-generator"); 
const userSchema = require('../model/userSchema');

require('./jwt_auth');
const Product = require("../model/productSchema");
const jwtauth = require('./jwt_auth');

//app.use(express.json({limit:"50mb"}));
//const { json } = require('express');
//app.use(express.urlencoded({limit: '50mb'}));


//firebase settings for otpsend
// const admin = require("firebase-admin");
// const credential = require("../Firebase/myapp-ada9e-firebase-adminsdk-tcq18-ae5e96912e.json");
// app.use(express.json());
dotenv.config({path: '../config.env'});
require('../db/conn');
const User = require('../model/userSchema');
const Video = require("../model/video");
const Course = require("../model/course");
const Buy = require("../model/BuyItemsModel");
app.use(express.json());
const { json } = require('express');




router.post('/enrollfreecourse' , async (req, res) => {
    console.log('connection of enrollfreecourse done');
    console.log(req.body);
    var courseid = req.header("CourseId");
    var username = req.header("Username");
    // res.status(201).send("url");
    //validating jwttoken
    try {
      console.log("enteringggg to buy free courses");
      var newHeaders = [];
      newHeaders = req.header("authorization").split(",");
      console.log(req.header("authorization")+"hiii");
      // console.log(req.header("size") + "hiii");
      // var filter = req.header("filter");
      // var page = req.header("page");
      // const productata = JSON.parse(req.body);
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
      console.log(process.env.jwt_retoken);
      console.log(typeof(headers));
      if (devicenum == 9) {
              res.status(401).send();
      }
  
      
  
      // const {alltoken} = req.get('Authorization');
      console.log(process.env.jwt_token);
      console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
      console.log(process.env.jwt_retoken);
      console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
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
      console.log("ok back from jwtauth to logout"); // jwt auth line 11   1
      const obj = [];
      // var skip = (parseInt(page)*5-5);
      // console.log(skip);
  
      //removing the token from mongo db
      // const user = await User.findOne({ token: process.env.jwt_token })
      if (refer == true) {
          console.log(User)
          if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
              console.log('under refer========true');
              // var count;
              // const total_products = await Product.aggregate([
              //     {$unwind: '$products'},
              //     {$match: {'products.rating': { $gte: "0",$lte: "5"}}},]
              //     )
              // console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+total_products.length);
              // const all_products = await Product.aggregate([
              //     {$unwind: '$products'},
              //     {$match: {'products.rating': { $gte: "0",$lte: "5"}}},]
              //     ).sort({"products.rating":-1}).skip(skip).limit(5);
              // console.log(all_products);
              try{const user = await User.findOne({ _id: verifyuser });

              //get secure url of databse s3 bucket

              console.log("line 155");
              console.log("JSON.parse(req.body)");

              var jasonn= req.body;
            //   var size_v = (jasonn.music_size);
             // console.log(size_v);
              console.log("user");
              const coursemtch = await Buy.findOne({name: user.name,'freeEnrollcourses.course[0].CourseId':  courseid});
              console.log(coursemtch);
              if(coursemtch==null) { //in bytes
                console.log("size is perfecttttttttttttttttttt");
                Buy.findOne({ name: user.name }).then(async (videoexist) => {
                    //console.log(videoexist);
                    const course = await Course.findOne({ CourseId: jasonn.course });
                    if(course!=null) {
                        console.log("course");
                        jasonn.course=[course];
                    } else if(course==null) {
                        res.status(202).send("Course Not Found");
                };
                    if (!videoexist) {
                        console.log("l1");
                        
                        //console.log(jasonn.course);

                        const buy = new Buy(
                            {name:user.name,
                            primeMember:false,
                            primeMemberRefundStatus:"null",
                            primememberPurchasedate:"null",
                            primemembershipname:"null",
                            primememberValiditydate:"null",
                            primememberExpired:false,
                            paidenrollCourses:[],
                            freeEnrollcourses:[jasonn],
                            paidenrollVideos:[],
                            paidenrollProducts:[],}
                            );
                            const buyinfo = await buy.save()
                            console.log(buyinfo);
                            const mdone = await Course.updateOne({ CourseId: courseid },
                                { "$push": { "Enrollusers":
                                 {username:user.name,
                                buydate:jasonn.courseBuydate,
                                review:"null",
                                rating:"0",} }, },{upsert:false,strict:false});
                            console.log(mdone);
                            const buyd = await Buy.findOne({ name: user.name });
                            res.status(201).send(buyd);
                    } else if(videoexist!=null){
                        console.log(videoexist);
                        const done = await Buy.updateOne({ name: user.name },
                            { "$push": { "freeEnrollcourses": jasonn }, },{upsert:false,strict:false});
                        const mdone = await Course.updateOne({ CourseId: courseid },
                                { "$push": { "Enrollusers":
                                 {username:user.name,
                                buydate:jasonn.courseBuydate,
                                review:"null",
                                rating:"0.0",} }, },{upsert:false,strict:false});
                        console.log(mdone);
                        const buyd = await Buy.findOne({ name: user.name });
                        res.status(201).send(buyd);
                    }
                
                
                });

                // res.setHeader('total_products',);
                
              }else{
                console.log(" bhaggggggggggggggggggggg");
                const past = await Course.findOne({CourseId:courseid,Enrollusers : { $elemMatch : { username : user.name } }}).select({Enrollusers : { $elemMatch : { username : user.name } }});
                console.log(past);
                if(past==null) {
                    const course = await Course.findOne({ CourseId: jasonn.course });
                    if(course!=null) {
                        console.log("course");
                        jasonn.course=[course];
                    }
                    const mdone = await Course.updateOne({ CourseId: courseid },
                        { "$push": { "Enrollusers":
                         {username:user.name,
                        buydate:jasonn.courseBuydate,
                        review:"null",
                        rating:"0.0",} }, },{upsert:false,strict:false});
                console.log(mdone);
                }
                res.status(202).send("Already Enrolled");
              }} catch(err) {
                console.log("line no 174"+err);
              }
              
              
          
                      
          } 
      } else if (refer == false) {
          
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


    
    

});
module.exports = router;