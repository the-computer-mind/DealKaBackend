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
const ProductReiewmodel = require("../model/ProductReviewModel");
const Buy = require("../model/BuyItemsModel");
app.use(express.json());
const { json } = require('express');


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



router.post('/buyproduct' , async (req, res) => {
    console.log('connection of Buying product done');
    console.log(req.body);
    var courseid = req.header("CourseId");
    var username = req.header("Username");
    var uniueidd = req.header("uniqueid");
    var qnt = req.header("qnty");
    // res.status(201).send("url");
    //validating jwttoken
    try {
      console.log("enteringggg to buy product");
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
              try{

              //get secure url of databse s3 bucket

              console.log("line 155");
              const user = await User.findOne({ _id: verifyuser });
              console.log("JSON.parse(req.body)");

              var jasonn= req.body;
            //   var size_v = (jasonn.music_size);
            //   console.log(size_v);
              console.log("user");
              if("size_v<487241590"=="size_v<487241590") { //in bytes
                console.log("size is perfecttttttttttttttttttt");
                Customer.findOne({  uniqueid: uniueidd  }).then(async (videoexist) => {
                    console.log(videoexist);
                    
                    if (videoexist && videoexist.ispaid==false) {
                        console.log("l1");
                        console.log(jasonn);
                        const mmd = await ProductReiewmodel.findOne({
                            ProductId: courseid
                        });
                        console.log(mmd);
                        console.log("mmddddrfrrrrr");
                        if(mmd ==null) {
                            const mddone = new ProductReiewmodel( {
                            ProductId: courseid ,
                            Enrollusers:[{
                            Customeruniqueid:uniueidd,
                            username:username,
                            buydate:jasonn.paydetails[0].paydate,
                            review:"null",
                            rating:"0",}] });
                        const buyinfo = await mddone.save()
                        console.log("hello byby");
                        console.log(buyinfo);
                        } else {
                            console.log("hello bhaissab");
                            const mmdone = await ProductReiewmodel.updateOne({ ProductId: courseid },
                                { "$push": { "Enrollusers":
                                 {  Customeruniqueid:uniueidd,
                                    username:username,
                                buydate:jasonn.paydetails[0].paydate,
                                review:"null",
                                rating:"0",} }, },{upsert:false,strict:false});
                            console.log(mmdone);
                        }


                        


                        const customerinfo = await Customer.updateOne({ "uniqueid": uniueidd },
                        { "$set": { "Seen_Details": jasonn.Seen_Details ,   "LastUpdateWork": "Buy",
                        "LastUpdatetime": jasonn.paydetails[0].paydate, }, });
                        
                            const mdone = await Customer.updateOne({ uniqueid: uniueidd },
                                { "$push": { "adderess_details":
                                    { buyer_adderess:jasonn.adderess_details[0].buyer_adderess,
                                        confirm_by_seller:jasonn.adderess_details[0].confirm_by_seller,} }, "$set": { "ispaid": true , "Quantity":qnt}},  {upsert:false,strict:false});
                            console.log(mdone);
                            const mdone2 = await Customer.updateOne({ uniqueid: uniueidd },
                                { "$push": { "paydetails":
                                 { paydate:jasonn.paydetails[0].paydate,
                                    payamount:jasonn.paydetails[0].payamount,
                                    transaction_id:jasonn.paydetails[0].transaction_id,
                                    payment_id:jasonn.paydetails[0].payment_id,} }},  {upsert:false,strict:false});
                            console.log(mdone2);
                            var stock = jasonn.product[0].ProductStock;
                            console.log(stock)
                            console.log(jasonn.Quantity)
                            console.log(typeof jasonn.Quantity)

                            
                            stock = stock-parseInt(jasonn.Quantity);
                            console.log(stock);
                            console.log("stock");
                            console.log(jasonn.product[0].ProductId)
                            const fir = await Product.updateOne({"products.ProductId":jasonn.product[0].ProductId},
                            { "$set":  { "products.0.ProductStock":stock} } );
                            console.log(fir);
                            const done = await User.updateOne({ name: jasonn.seller_name },
                                { "$push": { "unsendmsg": { "message": "Buy", "incomingsocketid": JSON.stringify(jasonn) } }, }, { upsert: false, strict: false });
                            const user = await User.findOne({ "name": jasonn.seller_name })
                            console.log(done);
                        
                            console.log(user);
                
                            if(user.UserStatus=="online") {
                    
                            console.log(done);
                          
                            console.log(user);
                
                            global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                                    console.log('messag is', messag); } );
                            
                    ///// 
                    /////
                    /////
                    /////
                    /////       
        
                              
                            } else {
                                global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                                                                            console.log('messag is', messag); } );
                           };
                            const buyd = await Customer.findOne({ uniqueid: uniueidd },);
                            res.status(201).send(buyd);
                    } else if(!videoexist){
                        console.log("203");
                        res.status(203).send("Course Not Found");

                        return 
                    }else if(videoexist.ispaid==true){
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