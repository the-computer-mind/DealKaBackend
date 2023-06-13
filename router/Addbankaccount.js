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
const UserBankAccount = require("../model/UserBankAccountModel");
const jwtauth = require('./jwt_auth');
const { json } = require('express');

router.post('/AddanewbankAcc',  async (req, res ) => {

    console.log('connection of addnewbank');
    console.log(req.body);
    // res.status(201).send("url");
    //validating jwttoken
    try {
      console.log("enteringggg to addnewbank");
      var newHeaders = [];
      newHeaders = req.header("authorization").split(",");
      console.log(req.header("authorization")+"hiii");
      // console.log(req.header("size") + "hiii");
      var username = req.header("username");
      var type = req.header("type");
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
    console.log("ok back from jwtauth to logout");
    const obj = [];

    //removing the token from mongo db
    // const user = await User.findOne({ token: process.env.jwt_token })
    if (refer == true) {
        console.log(User)
        if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
            console.log('under refer==true');
        var jasonn= req.body;
          const user = await User.findOne({ "name": username });
          console.log(username);
          console.log(user);
          console.log(jasonn);
          
          if(user.UserRole=="Normal") {
            const done = await User.updateOne({ name: username},
                { "$set": {UserRole:"Seller" }});
                console.log(done);
            const mddone = new UserBankAccount({
                name: username ,
                ListOfUserBAnkAccount:[jasonn] 
                
                });
                const buyinfo = await mddone.save();
                console.log("hello byby");
                console.log(buyinfo);
                const latestbank = await UserBankAccount.findOne({  name: username });
                res.status(201).send(latestbank);
          } else if (user.UserRole=="Seller") {
            if(type != "Create"){const mdone2 = await UserBankAccount.updateOne({  name: username },
                { "$push": { "ListOfUserBAnkAccount":
                  jasonn }},  {upsert:false,strict:false});
            console.log(mdone2);
            const latestbank = await UserBankAccount.findOne({  name: username });
            res.status(202).send(latestbank);} else {
                res.status(206).send("already added");
            }

          } else {
            res.status(204).send("different");
          }
            
            
            

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