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
const Customer = require("../model/customers_model");
const Buy = require("../model/BuyItemsModel");
app.use(express.json());
const { json } = require('express');
const cloudinary = require("../db/cloudinaryconfig");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const streamifier = require("streamifier");


// const region = "us-east-2"
// const bucketName = "my-app-hack-a-tube"
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const endpoint = 'my-app-hack-a-tube.s3.us-west-2.amazonaws.com'

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



router.post('/refund_payment_update',upload.array("image",3) , async (req, res) => {
    console.log('connection of refund product payment');
    console.log(req.files);
    console.log(req.data);
    console.log(req.body.json);
    console.log(req.files.length);
    var courseid = req.header("CourseId");
    var username = req.header("Username");
    var uniueidd = req.header("uniqueid");
    var qnt = req.header("qnty");
    var lastworkdatetime = req.header("Lastworkdate");
    // res.status(201).send("url");
    //validating jwttoken
    try {
      console.log("enteringggg to refund product");
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

              //var jasonn= req.body;
              var jasonn = JSON.parse(req.body.json)
              
            //   var size_v = (jasonn.music_size);
            //   console.log(size_v);
              console.log("user");
              if("size_v<487241590"=="size_v<487241590") { //in bytes
                console.log("size is perfecttttttttttttttttttt");
                Customer.findOne({  uniqueid: uniueidd  }).then(async (videoexist) => {
                    console.log(videoexist);
                    
                    if (videoexist && videoexist.isRefundQuaery_raised==false) {
                        console.log("l1");
                        console.log(jasonn);
                        const imageurl = [];
                    
                    for (i = 0; i < req.files.length; i++) {
                        const result = await cloudinary.uploader.upload(req.files[i].path);
                        console.log(result.secure_url);
                        imageurl.push(result.secure_url);
                    }
                    console.log("kiooooooooooooooooooooooooooo line 105");

                    const files = fs.readdirSync("./router/multer_images");
                    console.log("hiiiiiiiiiiiiiiiiiii");
                    try {
                        if (files != null) {
                            for (const file of files) {
                                console.log(file);
                                fs.unlinkSync(path.join("./router/multer_images", file), err => {
                                    if (err) throw err;
                                });
                            }
                        }
                    } catch (e) {
                        console.log("under err" + e);
                    }
                    console.log(imageurl+"jiiiiiiiii");
                    console.log(typeof(indexx)+"iiiiikkkkkkk");
                    console.log( jasonn.raised_refund_quaery[0].query_photos_link);
                    jasonn.raised_refund_quaery[0].query_photos_link=imageurl;
                    const customerinfo = await Customer.updateMany({ "uniqueid": uniueidd },
                        { "$set": { "Seen_Details": jasonn.Seen_Details,"raised_refund_quaery": jasonn.raised_refund_quaery,"isRefundQuaery_raised":true,"paydetails": jasonn.paydetails,   "LastUpdateWork": "Refund_Raised",
                        "LastUpdatetime": lastworkdatetime,
                     }, });
                        
                    const done = await User.updateOne({ name: jasonn.seller_name },
                                { "$push": { "unsendmsg": { "message": "Refund_Raised", "incomingsocketid": JSON.stringify(jasonn) } }, }, { upsert: false, strict: false });
                    const user = await User.findOne({ "name": jasonn.seller_name })
                    console.log(done);
                        
                            console.log(user);
                
                            if(user.UserStatus=="online") {
                    
                            console.log(done);
                          
                            console.log(user);
                
                            global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                                    console.log('messag is', messag);
                                    global.io.on("newmessconfirm", async (alltoken, callback) => {
                                        console.log(alltoken+"newmessconfirm");
                                        console.log("newmessconfirm");
                                        console.log("newmessconfirm");
                                        console.log("newmessconfirm");
                                        console.log("newmessconfirm");
                                        var newHeaders = [];
                                        newHeaders = alltoken.split(",");
                                        if (newHeaders.length < 2) {
                                            return;
                                        }
                                        const devicenum = newHeaders[0].slice(1, 2);
                                        console.log(devicenum);
                                        dn = devicenum;
                                        process.env.DeviceId=devicenum;
                                        process.env.jwt_token = newHeaders[1].slice(1,);
                                        console.log(process.env.jwt_token);
                                        process.env.jwt_retoken = newHeaders[2];
                                        process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
                                        console.log(process.env.jwt_retoken);
                                        var refer = await jwtauth();
                                        var verifyuser;
                                        // if (devicenum == 9||refer==false) {
                                        //     console.log("lppppppppppppppppppppppppp line 140");
                                        //     socket.disconnect();
                                        //     return;
                                        // }
                                        var id;
                                        try {
                                            const verifyUser = jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
                                        
                                            verifyuser = verifyUser;
                                            const ioo = await User.findOne({ "_id": verifyuser });
                                            console.log(ioo+"ioooooooooooooooo");
                                            if (ioo == null) {
                                                console.log("lppppppppppppppppppppppppp line 140");
                                                socket.disconnect();
                                                return;
                                            }
                                            dn = true;
                                            if(refer==true) {
                                                await ioo.updateOne({ "name": ioo.name },{ "$set": { 'unsendmsg': [] } });
                                            }

                                            console.log("singing...............");
                                            console.log("in...............");
                                        } catch (err) {
                                            if (err instanceof jwt.TokenExpiredError) {
                                                console.log("ookkk return from user object id verification");
                                                refer = false;
                                                console.log(err);
                                            }
                                        }
                                        
                                        });
                            } );
                            
                    ///// 
                    /////
                    /////
                    /////
                    /////       
        
                              
                            }
                            const buyd = await Customer.findOne({ uniqueid: uniueidd },);
                            res.status(201).send(imageurl);
                    } else if(!videoexist){
                        console.log("203");
                        res.status(203).send("Course Not Found");

                        return 
                    }else if(videoexist.isRefundQuaery_raised==true){
                        console.log("202");
                        res.status(202).send("already buy");
                        return 
                    }
                
                
                });

                // res.setHeader('total_products',);
                
              }else{
                console.log(" bhaggggggggggggggggggggg");
                res.status(202).send("bhag");
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