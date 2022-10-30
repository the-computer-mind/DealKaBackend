// //
// const crypto = require('crypto');
// const { promisify } = require("util");
// const randomBytes = promisify(crypto.randomBytes);
// const express = require('express');
// const router = express.Router();
// const app = express();
// const dotenv = require('dotenv');
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs');
// const otpgenerator = require("otp-generator"); 
// const userSchema = require('../model/userSchema');

// require('./jwt_auth');
// const Product = require("../model/productSchema");
// const jwtauth = require('./jwt_auth');

// //app.use(express.json({limit:"50mb"}));
// //const { json } = require('express');
// //app.use(express.urlencoded({limit: '50mb'}));


// //firebase settings for otpsend
// // const admin = require("firebase-admin");
// // const credential = require("../Firebase/myapp-ada9e-firebase-adminsdk-tcq18-ae5e96912e.json");
// // app.use(express.json());
// dotenv.config({path: '../config.env'});
// require('../db/conn');
// const User = require('../model/userSchema');
// const OtpM = require('../model/otpSchema');
// const MultipleTry = require('../model/multipletrySchema');
// const { Stream } = require('stream');
// const Video = require("../model/video");
// app.use(express.json());
// const { json } = require('express');


// const region = "us-east-2"
// const bucketName = "my-app-hack-a-tube"
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// // const endpoint = 'my-app-hack-a-tube.s3.us-west-2.amazonaws.com'

// const s3 = new aws.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
//   signatureVersion: 'v4',
// //   endpoint,

// })

// async function generateUploadURL(name_) {
//     const rawBytes = await randomBytes(16)
//     const imageName = rawBytes.toString('hex')
//     console.log(imageName);
//     const in_ =imageName+name_.toString();
//     console.log(in_);
  
//     const params = ({
//       Bucket: bucketName,
//     //   body:Stream,
//       Key: in_,
//       Expires: 60*2,
//       ContentType:'application/octet-stream',
//     })
    
//     const uploadURL = await s3.getSignedUrlPromise('putObject', params);
//     console.log(uploadURL);
//     return uploadURL
//   }



// router.post('/dislikeupdate' , async (req, res) => {
//     console.log('connection of dislikeupdate done');
//     console.log(req.body);
   
    
//     // res.status(201).send("url");
//     //validating jwttoken
//     try {
//       console.log("enteringggg to dislikeupdatedislikeupdatevv");
//       var newHeaders = [];
//       newHeaders = req.header("authorization").split(",");
//       console.log(req.header("authorization")+"hiii");
//       // console.log(req.header("size") + "hiii");
//       var videoid = req.header("VideoId");
//       var username = req.header("Username");
//       // const productata = JSON.parse(req.body);
//       console.log(); //this is the productmodel coming from flutter
//       console.log("req.body[1]");
//         // var newHeaders = headers.split(",");
//       const devicenum = newHeaders[0].slice(1, 2);
//       console.log(devicenum);
//       process.env.DeviceId=devicenum;
//       process.env.jwt_token = newHeaders[1].slice(1,);
//       console.log(process.env.jwt_token);
//       process.env.jwt_retoken = newHeaders[2];
//       process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
//       console.log(process.env.jwt_retoken);
//       console.log(typeof(headers));
//       if (devicenum == 9) {
//               res.status(401).send();
//       }
  
      
  
//       // const {alltoken} = req.get('Authorization');
//       console.log(process.env.jwt_token);
//       console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
//       console.log(process.env.jwt_retoken);
//       console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
//       //verifying is the jwt valid
//       var refer = await jwtauth();
//       var verifyuser;
//       try {
//           const verifyUser = jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
//           verifyuser = verifyUser;
//       } catch (err) {
//           if (err instanceof jwt.TokenExpiredError) {
//               console.log("ookkk return from user object id verification");
//               refer = false;
//               console.log(err);
//           }
//       }
//       console.log("ok back from jwtauth to logout"); // jwt auth line 11   1
//       const obj = [];
//       // var skip = (parseInt(page)*5-5);
//       // console.log(skip);
  
//       //removing the token from mongo db
//       // const user = await User.findOne({ token: process.env.jwt_token })
//       if (refer == true) {
//           console.log(User)
//           if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
//               console.log('under refer========true');
//               // var count;
//               // const total_products = await Product.aggregate([
//               //     {$unwind: '$products'},
//               //     {$match: {'products.rating': { $gte: "0",$lte: "5"}}},]
//               //     )
//               // console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+total_products.length);
//               // const all_products = await Product.aggregate([
//               //     {$unwind: '$products'},
//               //     {$match: {'products.rating': { $gte: "0",$lte: "5"}}},]
//               //     ).sort({"products.rating":-1}).skip(skip).limit(5);
//               // console.log(all_products);
//               try{
//                 const user = await User.findOne({ _id: verifyuser });

//               //get secure url of databse s3 bucket

//               console.log("line 155");
//               console.log(user.name);

//               var jasonn= req.body;
//             //   var size_v = (jasonn.video_size);
//              // console.log(size_v);
//               console.log("user");
//               if("size_v<487241590"=="size_v<487241590") { //in bytes
//                 console.log("size is perfecttttttttttttttttttt");
//                 Video.aggregate([
//                     { $unwind: '$viewers'},
//                     { $match: { $and: [{ "viewers.viewerusername": user.name },{ "VideoId": videoid }]}  }]).then(async (userExist1) => { 
//                     console.log(userExist1);
//                     if (userExist1.length==0) {
//                         console.log("mmm");

//                         console.log("l1");
//                         const done = await Video.updateOne({ VideoId: videoid },
//                                             { "$push": { "viewers": jasonn }, },{upsert:false,strict:false});
                        

                        
                        
//                         console.log(done);
                    
                        
//                         const videoh = await Video.findOne({VideoId: videoid});
//                         console.log(videoh);
//                         console.log(videoh.no_views+1);
//                         console.log(videoh.no_views);
//                         const mdone = await Video.updateOne({ VideoId: videoid },
//                             { "$set": { $and: [ { "no_views": videoh.no_views+1 },{ "video_dislike": videoh.video_dislike+1 }]} },{upsert:false,strict:false});
//                         console.log(mdone);
//                         const videohh = await Video.findOne({VideoId: videoid});
                        
                        
//                         res.status(201).send(videohh);
//                     } else {

//                         console.log("not find but like ....................");
//                         if(userExist1[0].viewers.like=='null') {
//                             console.log("if dislike==null");
//                             const done = await Video.updateOne({ VideoId: videoid },
//                                 { "$push": { "viewers": jasonn }, },{upsert:false,strict:false});
//                             console.log(done);
//                             const videoh = await Video.findOne({VideoId: videoid});
//                             console.log(videoh);
//                             console.log(videoh.no_views+1);
//                             console.log(videoh.no_views);
//                             const mdone = await Video.updateOne({ VideoId: videoid },
//                                     { "$set": { "video_dislike": videoh.video_dislike+1 }, },{upsert:false,strict:false});
//                             const videohh = await Video.findOne({VideoId: videoid});

//                             res.status(201).send(videohh);
                            
//                         }else if (userExist1[0].viewers.like=='dislike') {
//                             console.log("if dislike==dislike");
//                             res.status(202).send("Already Liked video");
//                         } else if (userExist1[0].viewers.like=='like') {
//                             console.log("if dislike==like");
//                             const done = await Video.updateOne({ VideoId: videoid },
//                                 { "$push": { "viewers": jasonn }, },{upsert:false,strict:false});
//                             console.log(done);
//                             const videoh = await Video.findOne({VideoId: videoid});
//                             console.log(videoh);
//                             console.log(videoh.no_views+1);
//                             console.log(videoh.no_views);
//                             const mdone = await Video.updateOne({ VideoId: videoid },
//                                 { "$set": { $and: [ { "video_dislike": videoh.video_dislike+1 },{ "video_like": videoh.video_like-1 }]} },{upsert:false,strict:false});
//                             console.log(mdone);
//                             const videohh = await Video.findOne({VideoId: videoid});

//                             res.status(201).send(videohh);

//                         }
                        
        

        
        
        
//                     }
                
                
//                 });

//                 // res.setHeader('total_products',);
                
//               }else{
//                 console.log(" bhaggggggggggggggggggggg");
//                 res.status(202).send("bhag");
//               }} catch(err) {
//                 console.log("line no 174"+err);
//               }
              
              
          
                      
//           } 
//       } else if (refer == false) {
          
//           console.log("refresh block of logout.js");
  
//           res.status(200).send("token code expire but refresh work");
//           return;
//       } else if (refer == 2) {
          
//           console.log("done");
         
//           try {
//                   if (devicenum == 0) {
//                     console.log("yes jwt token is not expired");
//                     const done = await User.updateOne({ "tokens.token": process.env.jwt_token }, //first previou one whch you want to remove 
//                         { "$set": { "tokens.$.token": "null" } });
//                     console.log(done);
//                     const mdone = await User.updateOne({ "retokens.retoken": process.env.jwt_retoken },
//                         { "$set": { "retokens.$.retoken": "null" } });
//                     console.log(mdone);
                    
//                 } else if (devicenum == 1) {
//                     console.log("user");
//                     const done = await User.updateOne({ "tokens.0.md1token": process.env.jwt_token },
//                         { "$set": { "tokens.0.md1token": "null" }, });
//                     console.log(done);
//                     const mdone = await User.updateOne({ "retokens.0.md1retoken": process.env.jwt_retoken },
//                         { "$set": { "retokens.0.md1retoken": "null" } });
//                     console.log(mdone);
  
//                 } else if (devicenum == 2) {
//                     const done = await User.updateOne({ "tokens.0.md2token": process.env.jwt_token },
//                         { "$set": { "tokens.0.md2token": "null" }, });
//                     console.log(done);
//                     const mdone = await User.updateOne({ "retokens.0.md2retoken": process.env.jwt_retoken },
//                         { "$set": { "retokens.0.md2retoken": "null" }, });
//                     console.log(mdone);
  
//                 } else if (devicenum == 3) {
//                     const done = await User.updateOne({ "tokens.0.md3token": process.env.jwt_token },
//                         { "$set": { "tokens.0.md3token": "null" }, });
//                     console.log(done);
//                     const mdone = await User.updateOne({ "retokens.0.md3retoken": process.env.jwt_retoken },
//                     { "$set": { "retokens.0.md3retoken": "null" }, });
//                     console.log(mdone);
//                 } else if (devicenum == 4) {
//                     const done = await User.updateOne({ "tokens.0.md4token": process.env.jwt_token },
//                         { "$set": { "tokens.0.md4token": "null" }, });
//                     console.log(done);
//                     const mdone = await User.updateOne({ "retokens.0.md4retoken": process.env.jwt_retoken },
//                         { "$set": { "retokens.0.md4retoken": "null" } });
//                     console.log(mdone);
//                 }
//           } catch (err) {
//               console.log(err)
//           }
//           // console.log("refresh block of logout.js");
//           res.status(203).send("token code and refresh both expire");
//           return;
//           }
//       } catch (err) {
//           console.log(err);
//       }


    
    

// });
// module.exports = router;