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


router.post('/userallproducts', async (req, res) => {

    try {
        console.log("enteringggg to userallproduct");
        
        var newHeaders = [];
        newHeaders = req.header("authorization").split(",");
        console.log(req.header("authorization") + "hiii");
        // const productata = JSON.parse(req.body);
        // console.log(JSON.parse(req.body.json)); //this is the productmodel coming from flutter
        // console.log("req.body[1]");
        // var newHeaders = headers.split(",");
        const devicenum = newHeaders[0].slice(1, 2);
        console.log(devicenum);
        process.env.jwt_token = newHeaders[1].slice(1,);
        console.log(process.env.jwt_token);
        process.env.DeviceId=devicenum;
        process.env.jwt_retoken = newHeaders[2];
        process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
        console.log(process.env.jwt_retoken);
        console.log(typeof (headers));
    
        
    
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

        if (refer == true) { //thats means jwt token not expired
            console.log("under refer=true");
            
            if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
                Product.findOne({ "userobjectid": verifyuser }).then(async (userExist) => { 
                    console.log(userExist);
                    if (userExist && userExist.products.length!=0) {
                        console.log("under userex");
                        console.log(userExist);
                        const products = await Product.findOne({ "userobjectid": verifyuser },);
                        
                        console.log(products);
                        // for (var i = 0; i < jproducts.products.length; i++){
                        //     const e = delete jproducts.products[i]["_id"];
                        //     console.log(typeof(jproducts));
                        // };
                        // const { _id, ...rest } = jproducts;
                        console.log("all products printed");
                        res.status(201).send(products);
                        
                    } else if (!userExist || userExist.products.length==0) {
                        res.status(204).send("No Products Found");
                        return;
                    }

                }).catch((err) => {
                    console.log(err);
                })
                    
             }

        }

        else if (refer == false) { //thats means jwt token expired but rtoken not exp
          
            console.log("refresh block of userallproduct.js");

            res.status(200).send("token code expire but refresh work");
            return;

        }

        else if (refer == 2) { //both expire token and rtoken
            
                console.log("refer=2");
                //sedning response tokens[0]["token"];
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

    } catch (err)  {
        console.log(err);
    };

 })

module.exports = router;