const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
app.use(express.json());

require('../db/conn');
require('./jwt_auth');
const User = require('../model/userSchema');
const jwtauth = require('./jwt_auth');

router.post('/logout', async (req, res ) => {

    console.log("enteringggg to logout");
    try {var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    console.log(req.header("authorization")+"hiii");
    // var newHeaders = headers.split(",");
    const devicenum = newHeaders[0].slice(1, 2);
    console.log(devicenum);
    process.env.DeviceId = devicenum;
    process.env.jwt_token = newHeaders[1].slice(1,);
    console.log(process.env.jwt_token);
    process.env.jwt_retoken = newHeaders[2];
    process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
    console.log(process.env.jwt_retoken);
    console.log(typeof(headers));

    

    // const {alltoken} = req.get('Authorization');
    console.log(process.env.jwt_token);
    console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk    '+process.env.DeviceId);
    console.log(process.env.jwt_retoken);
    console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    //verifying is the jwt valid
    // process.env.DeviceId = devicenum;
    const refer = await jwtauth();
    console.log("ok back from jwtauth to logout");
    const obj = [];

    //removing the token from mongo db
    // const user = await User.findOne({ token: process.env.jwt_token })
    if (refer == true) {
        console.log("hi")
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
        //
        // const done = await User.updateOne({ "tokens.token": process.env.jwt_token },
        //     { "$set": { "tokens.$.token": "null" } });
        // const mdone = await User.updateOne({ "retokens.retoken": process.env.jwt_retoken },
        //     { "$set": { "retokens.$.retoken": "null" } }); //if you don't know the exact value give $
        // // User.save
        // console.log(done);
        // console.log(mdone);
        //sedning response tokens[0]["token"];
        res.status(201).send("suceessfully logout");
        return;
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
        // console.log(User)
        // const done = await User.updateOne({ "tokens.token": process.env.jwt_token }, 
        // { "$set": { "tokens.$.token": "null" } }) //if you don't know the exact value give $
        // User.save
        console.log("done");
        //sedning response tokens[0]["token"];
                try {if (devicenum == 0) {
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
                    console.log(error)
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