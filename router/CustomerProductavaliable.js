const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cloudinary = require("../db/cloudinaryconfig");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const streamifier = require("streamifier");
// const multer = require("multer");
// const upload = multer();

app.use(express.json());

require('../db/conn');
require('./jwt_auth');
const User = require('../model/userSchema');
const Product = require("../model/productSchema");
const Customer = require("../model/customers_model");
const jwtauth = require('./jwt_auth');
const { json } = require('express');

router.post('/productavailable',  async (req, res ) => {

    console.log('connection of available check done');
    console.log(req.body);
    // res.status(201).send("url");
    //validating jwttoken
    try {
      console.log("enteringggg to productavailable");
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
        var lastworkdatetime = req.header("Lastworkdate");
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
    console.log("ok back from jwtauth to logout");
    const obj = [];

    //removing the token from mongo db
    
    if (refer == true) {
        console.log(User)
        if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
            console.log('under refer==true');
            var product_json = req.body;
            Customer.findOne({ "orderid" : product_json.orderid }).then(async (userExist) => {
                if (userExist) {
                    console.log(userExist);
                    console.log("hello dear brother");
                    console.log(product_json.availabilitycheck[0]);
                    console.log(userExist.uniqueid);
                    if(userExist.ispaid!=true) {
                        const mdone3 = await Customer.updateOne({ uniqueid: userExist.uniqueid},
                            { "$push": { "availabilitycheck": product_json.availabilitycheck[0] }},  {upsert:false,strict:false});
                            const fdone3 = await Customer.updateOne({ uniqueid: userExist.uniqueid},
                                { "$set": {   "LastUpdateWork": "IsAvailable",
                                "LastUpdatetime": lastworkdatetime, }},);
                                console.log(fdone3);
                        console.log(mdone3);

                        const mdone5 = await Customer.findOne({ uniqueid: userExist.uniqueid });
                        res.status(202).send(mdone5);
                        return;
                    }
                    else {
                        console.log("saving customerdetails");
                        const customer = new Customer(product_json);
                        const customerinfo = await customer.save();
                        
                        console.log(customerinfo);
                        
                        
                        const done = await User.updateOne({ name: product_json.seller_name },
                                { "$push": { "unsendmsg": { "message": "available", "incomingsocketid":JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                        const user = await User.findOne({ "name": product_json.seller_name })
                        console.log(done);
                      
                        console.log("user.unsendmsg");
            
                        if(user.UserStatus=="online") {

                            global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {

                                console.log('messag is', user.unsendmsg);
                         
                        } );
                        }
                        
                        res.status(201).send("save");
                        return; }
                    
                } else if (!userExist) {
                    console.log("saving no exist");
                    const customer = new Customer(product_json);
                    const customerinfo = await customer.save();
                    
                    console.log(customerinfo);
                    
                    
                    const done = await User.updateOne({ name: product_json.seller_name },
                            { "$push": { "unsendmsg": { "message": "available", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                    const user = await User.findOne({ "name": product_json.seller_name })
                    console.log(done);
                  
                    console.log("user.unsendmsg");
        
                    if(user.UserStatus=="online") {

                         global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                                    console.log('messag is', user.unsendmsg);
                                   
                            } );
                    }
                    
                    res.status(201).send("save");
                    return;
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).send("Somethig Wrong");
                return;
            });
            

        } 
    } else if (refer == false) {
        // console.log(User)
        // const done = await User.updateOne({ "tokens.token": process.env.jwt_token }, 
        // { "$set": { "tokens.$.token": "null" } }) //if you don't know the exact value give $
        // User.save
        // console.log(done);
        //sedning response tokens[0]["token"];
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