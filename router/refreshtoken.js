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

router.post('/refreshtoken', async (req, res) => {

    console.log("enteringggg to refreshtoken of rt pGE");
    var edevicenum;
    
    try {
        var newHeaders = [];
        newHeaders = req.header("authorization").split(",");
        console.log(req.header("authorization")+"reshhhhtttttt");
        // var newHeaders = headers.split(",");
        const devicenum = newHeaders[0].slice(1, 2);
        console.log(devicenum);
        edevicenum = devicenum;
        process.env.jwt_token = newHeaders[1].slice(1,);
        process.env.jwt_retoken = newHeaders[2];
        process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
        console.log(process.env.jwt_retoken);
                
        const verifyUser = jwt.verify(process.env.jwt_retoken, process.env.R_TOKEN_SECRET);
        // const user = await User.findOne({ _id: verifyUser._id })
        console.log("kkkkkkkkkkkk");
        const tttoken = await jwt.sign({ _id: verifyUser._id.toString() }, process.env.TOKEN_SECRET, {
            expiresIn: "2m"
        });

        const rretoken = await jwt.sign({ _id: verifyUser._id.toString()}, process.env.R_TOKEN_SECRET, {
            expiresIn: "2m"
        });
        // const token = alltoken[0];
        // const retoken = alltoken[1];
        console.log("cholooo end");
        if (devicenum == 0) {
            console.log("under if devicenum=0 in resfresh token page");
            const dddone = await User.updateOne({ "tokens.token": process.env.jwt_token }, //first previou one whch you want to remove 
                { "$set": { "tokens.$.token": tttoken } });
            console.log(dddone);
            const ddone = await User.updateOne({ "retokens.retoken": process.env.jwt_retoken },
                { "$set": { "retokens.$.retoken": rretoken } });
            console.log(ddone);
            
        } else if (devicenum == 1) {
            console.log("ok find");
            const dddone = await User.updateOne({ "tokens.0.md1token": process.env.jwt_token },
                { "$set": { "tokens.0.md1token": tttoken }, });
            console.log(dddone);
            const ddone = await User.updateOne({ "retokens.0.md1retoken": process.env.jwt_retoken },
                { "$set": { "retokens.0.md1retoken": rretoken } });
            console.log(ddone);

        } else if (devicenum == 2) {
            const dddone = await User.updateOne({ "tokens.0.md2token": process.env.jwt_token },
                { "$set": { "tokens.0.md2token": tttoken }, });
            console.log(dddone);
            const ddone = await User.updateOne({ "retokens.0.md2retoken": process.env.jwt_retoken },
                { "$set": { "retokens.0.md2retoken": rretoken } });
            console.log(ddone);

        } else if (devicenum == 3) {
            const dddone = await User.updateOne({ "tokens.0.md3token": process.env.jwt_token },
                { "$set": { "tokens.0.md3token": tttoken }, });
            console.log(dddone);
            
            const ddone = await User.updateOne({ "retokens.0.md3retoken": process.env.jwt_retoken },
                { "$set": { "retokens.0.md3retoken": rretoken } });
            console.log(ddone);
        } 
        process.env.jwt_token = tttoken;
        process.env.jwt_retoken = rretoken;
        const alltoken = [devicenum,tttoken, rretoken];
        res.status(200).send(alltoken);
        return;
            
    } catch (err) {
        console.log(err + "jiiiii");
        const devicenum=edevicenum;
        try {
            if (err instanceof jwt.TokenExpiredError) {
                console.log("jjeeeeeeeeeee" + devicenum);
            if (devicenum == 0) {
                console.log("yes jwt token and rtoken both expired");
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
            res.status(203).send("something went wrong");
            return;
        }
        } catch (err) {
            console.log(err);
            }
            

        }



})

module.exports = router;