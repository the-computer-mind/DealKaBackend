const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cloudinary = require("../db/cloudinaryconfig");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const Razorpay = require('razorpay');
const streamifier = require("streamifier");
// const multer = require("multer");
// const upload = multer();

app.use(express.json());

require('../db/conn');
require('./jwt_auth');
const User = require('../model/userSchema');
const Wallet = require("../model/UserWallet_Model");
const Customer = require("../model/customers_model");
const jwtauth = require('./jwt_auth');
const { json } = require('express');


router.post('/ReferCodeCheck',  async (req, res ) => {

    try {
    console.log("enteringggg to check my refer code");
    var type = req.header("type");
    var refercode = req.header("refercode");
    // const productata = JSON.parse(req.body);//this is the productmodel coming from flutter
    console.log("req.body[1]");
      // var newHeaders = headers.split(",");
    

    if (true == true) {
        console.log(User)
        if (0 == 0) {
            console.log('under refer==true');
            // var product_json = JSON.parse(req.body.json)
            Wallet.findOne({ "Refercode" : refercode }).then(async (userExist) => {
                console.log("hello bhaiya");
                console.log(userExist);
                if (userExist) {
                    res.status(201).send("exist");return;
            
                    
                } else  {
                    console.log("hello not exist");
                    res.status(202).send("not exist");
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