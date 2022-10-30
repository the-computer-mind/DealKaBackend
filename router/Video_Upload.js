const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cloudinary = require("../db/cloudinaryconfig");
const upload = require("./multer_video");
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

router.post('/uploadvideo',upload.array("video",1),  async (req, res ) => {

    try {
    console.log("enteringggg to productadd");
    console.log(req.files.length);
    var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    console.log(req.header("authorization")+"hiii");
    // const productata = JSON.parse(req.body);
    console.log(JSON.parse(req.body.json)); //this is the productmodel coming from flutter
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
            console.log('under refer==true');
            var product_json = JSON.parse(req.body.json)
            Product.findOne({ "products.ProductName" : product_json.ProductName }).then(async (userExist) => {
                if (userExist) {
                    var productinfo = await Product.aggregate([
                        { $unwind: '$products'},
                        { $match: {$and:[{"products.ProductName": product_json.ProductName,},{"products.type": product_json.type}]}}]);
                    console.log(productinfo);
                    console.log(product_json.ProductName);
                    const user = await User.findOne({ _id: verifyuser });
                    Product.aggregate([
                        {$match: {name:user.name}},
                        { $unwind: '$products'},
                        { $match: { $and: [{ "products.ProductName": product_json.ProductName }, { "products.type": product_json.type }] } }]).then(async (userExist1) => { 
                            console.log(userExist1);
                        if (userExist1.length != 0 && userExist) {
                            console
                            res.status(222).send("Duplicate Product Found");
                            return;
                        }
                        else if (userExist1.length==0) {

                                console.log("user");
                                console.log("devi 1");
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
                                
                                req.body.json.ProductImageUrl = imageurl;
                                console.log(req.body.json);
                                
                                product_json.ProductImageUrl = imageurl
                                console.log(product_json);
                                const user = await User.findOne({ _id: verifyuser });
                                console.log("r1");
                                const oldproduct = await Product.findOne({ name: user.name });
                                const totalprod = oldproduct!=null?oldproduct.products.length:0;
                                console.log("r1");

                                Product.findOne({ userobjectid: verifyuser }).then(async (productExist) => {
                                    if (!productExist) {
                                        console.log("l1");
                                        const product = new Product({
                                            userobjectid: user._id,
                                            name: user.name,
                                            totalproduct: totalprod + 1,
                                            noofuserrating: "0",
                                            userrating:"0",
                                                products: [product_json],
                                            });
                                            const productinfo = await product.save()
                                            console.log(productinfo);
                                    } else if (productExist) {
                                        const done = await Product.updateOne({userobjectid:verifyuser },
                                            { "$push": { "products": product_json }, },{upsert:false,strict:false});
                                        console.log(done);
                                        const mdone = await Product.updateOne({userobjectid:verifyuser },
                                            { "$set": { "totalproduct": totalprod+1 }, },{upsert:false,strict:false});
                                        console.log(mdone);
                                
                                    } //, { "$set": { "totalproduct": (totalprod+1).toString() }, } 
                                }).catch((err) => {
                                    console.log(err);
                                });
                                
                                
                                console.log("line 126 of productadd");
                            res.status(201).send("suceessfully get product data and token not expired");
                            return;
                        }
                    }).catch((err) => { console.log(err) });
                    
                } else if (!userExist) {
                    console.log("user");
                    console.log("devi 1");
                    const imageurl = [];
                    
                    for (i = 0; i < req.files.length; i++) {
                        const result = await cloudinary.uploader.upload(req.files[i].path);
                        console.log(result.secure_url);
                        imageurl.push(result.secure_url);
                    }
                    console.log(imageurl);
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
                    
                    req.body.json.ProductImageUrl = imageurl;
                    console.log(req.body.json);
                    
                    product_json.ProductImageUrl = imageurl
                    console.log(product_json);
                    const user = await User.findOne({ _id: verifyuser });
                    console.log("r1");
                    const oldproduct = await Product.findOne({ name: user.name });
                    const totalprod = oldproduct!=null?oldproduct.products.length:0;
                    console.log("r1");

                    Product.findOne({ userobjectid: verifyuser }).then(async (userExist) => {
                        if (!userExist) {
                            console.log("l1");
                            const product = new Product({
                                userobjectid: user._id,
                                name:user.name,
                                totalnoofchatUsers: 1,
                                totalproduct: totalprod + 1,
                                noofuserrating: "0",
                                userrating:"0",
                                    products: [product_json],
                                });
                                const productinfo = await product.save()
                                console.log(productinfo);
                        } else if (userExist) {
                            const done = await Product.updateOne({userobjectid:verifyuser },
                                { "$push": { "products": product_json }, },{upsert:false,strict:false});
                            console.log(done);
                            const mdone = await Product.updateOne({userobjectid:verifyuser },
                                { "$set": { "totalproduct": totalprod+1 }, },{upsert:false,strict:false});
                            console.log(mdone);
                    
                        } //, { "$set": { "totalproduct": (totalprod+1).toString() }, } 
                    }).catch((err) => {
                        console.log(err);
                    });
                    
                    
                    console.log("great");
                    res.status(201).send("suceessfully get product data and token not expired");
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