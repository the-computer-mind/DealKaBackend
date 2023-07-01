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
const jwtauth = require('./jwt_auth');
const { json } = require('express');

router.post('/productupdatenew',  async (req, res ) => {

    try {
    console.log("enteringggg to productupdatenew");
    
    var imgchange = req.header("wantochangeimg");
    var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    console.log(req.header("authorization")+"hiii");
    // const productata = JSON.parse(req.body);
    //console.log(JSON.parse(req.body.json)); //this is the productmodel coming from flutter
    console.log("req.body[1]");
      // var newHeaders = headers.split(",");
    const devicenum = newHeaders[0].slice(1, 2);
    console.log(devicenum);
    process.env.jwt_token = newHeaders[1].slice(1,);
    console.log(process.env.jwt_token);
    process.env.DeviceId=devicenum;
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
            console.log('under refer==true');
            console.log(req.body)
            var product_json = req.body
            Product.findOne({ "products.ProductId" : product_json.ProductId }).then(async (userExist) => {
                if (userExist) {
                 
                    console.log("productinfo");
                    console.log(product_json.ProductName);
                    const user = await User.findOne({ _id: verifyuser });
                   try { 
                        

                                console.log("user");
                                console.log("devi 1");
                                // const imageurl = [];
                                // if (imgchange=="true") {
                                //      for (i = 0; i < req.files.length; i++) {
                                //     const result = await cloudinary.uploader.upload(req.files[i].path);
                                //     console.log(result.secure_url);
                                //     imageurl.push(result.secure_url);
                                // }
                                // console.log("kiooooooooooooooooooooooooooo line 105");

                                // const files = fs.readdirSync("./router/multer_images");
                                // console.log("hiiiiiiiiiiiiiiiiiii");
                                // try {
                                //     if (files != null) {
                                //         for (const file of files) {
                                //             console.log(file);
                                //             fs.unlinkSync(path.join("./router/multer_images", file), err => {
                                //                 if (err) throw err;
                                //             });
                                //         }
                                //     }
                                // } catch (e) {
                                //     console.log("under err" + e);
                                // }
                                // console.log(imageurl+"jiiiiiiiii");
                                
                                // req.body.json.ProductImageUrl = imageurl;
                                // console.log(req.body.json);
                                
                                // product_json.ProductImageUrl = imageurl
                                // console.log(product_json);
                                // }
                                // console.log(product_json.ProductPrice);
                                console.log("user");
                                console.log("devi 1");
                                            
                                            
                                            console.log("under else if line 86");
                                            console.log("line 126 of productadd");
                                            console.log(product_json.ProductImageUrl);
                                            const mdelete = await Product.updateOne({  name: user.name},
                                                { "$pull": { "products":{"ProductId":product_json.ProductId}}, },{ safe: true, multi:true });
                                            console.log(mdelete);   
                                            const mdone = await Product.updateOne({ name: user.name },
                                                { "$push": { "products": product_json }},{upsert:false,strict:false});
                                            console.log(mdone);
                                            const products = await Product.findOne({ "userobjectid": verifyuser },);
                                            res.status(201).send(products);
                                            return;
                        
                    } catch(err) { console.log(err) };
                    
                } else if (!userExist) {
                    console.log("user");
                    console.log("devi 1");
                    
                    res.status(202).send("no product found");
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