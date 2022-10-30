const cluster = require("cluster");
const os = require("os");
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
const Course = require("../model/course");
const Buy = require("../model/BuyItemsModel");
const AddMusicCatagory = require("../model/addnewmusicctagorymodel");
const jwtauth = require('./jwt_auth');
const { json, response } = require('express');

try{router.post('/getallcourses',  async (req, res ) => {

    try {
    console.log("enteringggg to getallcourses");
    var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    console.log(req.header("authorization")+"hiii");
    console.log(req.header("size") + "hiii");
    var filter = req.header("filter");
    var searchquery = req.header("searchquery");
    var page = req.header("page");
    var search = req.header("search");
    var name = req.header("name");
    var no_of_videos_sendig=20;
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
    // console.log(process.env.jwt_retoken);
    // console.log(typeof(headers));
    if (devicenum == 9) {
            res.status(401).send();
    }

    

    // const {alltoken} = req.get('Authorization');
    // console.log(process.env.jwt_token);
    // console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    // console.log(process.env.jwt_retoken);
    // console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
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
    var skip = (parseInt(page)*no_of_videos_sendig-no_of_videos_sendig);
    console.log(skip);

    //removing the token from mongo db
    console.log("skip");
    console.log(verifyuser);
    const user = await User.findOne({name:name});

    console.log("user");
    if (refer == true) {
        // console.log(User)
        if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
            console.log('under getallvideooooooooooooooo');
            var count;
            console.log( search);
            const user = await User.findOne({ _id: verifyuser });
            if(search=="false"){
                
            const total_products = await Course.aggregate([
                // {$unwind: '$products'},
                {$match: {'Approved': true}},
                {$match: {'unfinished': false},}
                ]
                )

            // const channeldescrip2= await Channel.findOne(
            //         {name : user.name},);

            //const userrole = await User.findOne({name: username});
            console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+total_products.length);
            console.log(user.name);
            const all_videos = await Course.aggregate([
                // {$unwind: '$products'},
                {$match: {'Approved': true}},
                {$match: {'unfinished': false},}
            ]
                ).sort({"Algorithmpush":-1, _id: -1 }).skip(skip).limit(no_of_videos_sendig);
            console.log(all_videos+ "    jjjjjjjjjjjj");
            res.setHeader('total_products',total_products.length);

            var buy = await Buy.aggregate([
                // {$unwind: '$products'},
                {$match: {'name': user.name}},
            ]);
            console.log(buy);
            // if(buy.name==null) {
            //     buy=[];
            //     console.log("chalo buy shell execute");
            // } else {
            //     buy=buy; //paidenrollCourses
            // }
            console.log(buy+ "    yyyyyy");
            

            

            const all_products= [all_videos,buy];
            res.status(201).send(all_products);
         
        
        } else if(search=="true") {
            console.log(searchquery);
            // const total_products = await Course.aggregate([
            //     // {$unwind: '$products'},
            //     {$match: {'Approved': true}},
            //     {$match: {'unfinished': false},}

            //     ]
            //     );
                //console.log("tata"+total_products.length);
                const all_videos = await Course.aggregate([
                    // {$unwind: '$products'},
                    {$match: {"tags" : {$regex : '.*' + searchquery + '.*'},'Approved': true}},
                    //{$match: {'shortvideo': false},}
                    {$match: {'unfinished': false},}
                ]
                    ).sort({"Algorithmpush":-1}).skip(0).limit(200);
                const all_products= [all_videos];
                
                console.log(all_products);
                res.setHeader('total_products',all_videos.length);
                res.status(201).send(all_products);}
            }
            
        
                    
        } 
    else if (refer == false) {
        
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
} catch (err) {
    console.log(err);
}