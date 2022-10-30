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
const jwtauth = require('./jwt_auth');
const { json } = require('express');
const { parse } = require('dotenv');

router.post('/deleteproduct',  async (req, res ) => {

    try {
    console.log("enteringggg to productdelete");
    console.log(req.files);
    var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    console.log(req.header("authorization")+"hiii");
    console.log(req.header("index") + "hiii");
    var index = req.header("index");
    // const productata = JSON.parse(req.body);
    console.log(req.body); //this is the productmodel coming from flutter
    console.log("req.body[1]");
      // var newHeaders = headers.split(",");
    const devicenum = newHeaders[0].slice(1, 2);
    console.log(devicenum);
    process.env.jwt_token = newHeaders[1].slice(1,);
    console.log(process.env.jwt_token);
    process.env.jwt_retoken = newHeaders[2];
    process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
    console.log(process.env.jwt_retoken);
    console.log(typeof(headers));

    

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
                    console.log('under refer========true');
                    var product_json = req.body;
                    console.log(product_json.ProductName);
                    Product.aggregate([
                        { $unwind: '$products'},
                        { $match: { $and: [{ "products.ProductName": product_json.ProductName }, { "products.type": product_json.type },{ "products.ProductDescription": product_json.ProductDescription },{ "products.ProductPrice": product_json.ProductPrice },{ "products.ProductStock": product_json.ProductStock },{ "products.ProductImageUrl": product_json.ProductImageUrl },{ "products.state": product_json.state },{ "products.rating": product_json.rating}] } }]).then(async (userExist1) => { 
                            if (userExist1.length!=0 && userExist1) {
                            console.log(userExist1);
                            totalp = parseInt(userExist1[0].totalproduct-1);
                            console.log(totalp);
                            console.log("under if line 86");
                            const user = await User.findOne({ _id: verifyuser });
                            const mdone = await Product.updateOne({ name: user.name },
                                { "$pull": { [`products`]: product_json }, },{upsert:false,strict:false});
                            console.log(mdone);
                            const m2done = await Product.updateOne({ name: user.name },
                                { "$set": { [`totalproduct`]: userExist1[0].totalproduct-1 }, },{upsert:false,strict:false});
                            console.log(m2done);
                            res.status(201).send("suceessfully get product data and token not expired");
                            
                            return;
                        }
                    }).catch((err) => { console.log(err) });
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