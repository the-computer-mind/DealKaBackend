const express = require('express');
const router = express.Router();
const app = express();
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const otpgenerator = require("otp-generator"); 
const userSchema = require('../model/userSchema');
const Channel = require('../model/channeldescription');


//firebase settings for otpsend
// const admin = require("firebase-admin");
// const credential = require("../Firebase/myapp-ada9e-firebase-adminsdk-tcq18-ae5e96912e.json");
// app.use(express.json());
dotenv.config({path: '../config.env'});
require('../db/conn');
const User = require('../model/userSchema');
const OtpM = require('../model/otpSchema');
const MultipleTry = require('../model/multipletrySchema');
const twillo = require("twilio")(process.env.Twillo_SID,process.env.Twillo_Auth_Token);


//now to send data we use get but to read coming data
            // we use post now let think user send json data on /registering page
router.post('/storeuserbygoogleapi', async (req, res) => {
    try {
            const { name, email, password, cpassword } = req.body;
            console.log(name);
            console.log(email);
            console.log(req.body);
            var date = req.header("Date");
            var profilepic = req.header("ProfilePicture");
            console.log(date + "time");
            console.log("storeuserbygoogleapi" + name.toLowerCase());

            if(!name || !email || !password || !cpassword){
                return res.send.json({error: "plz type all field"});
            };
            var complete = 0;
            var usere2 = 0;
            User.findOne({ name: name.toLowerCase() }).then(async (userExist2) => {
                if (userExist2) {
                    console.log("ok so username already exist");
                    usere2 = 1;
                    return res.status(229).json({ error: "Name already Exist"})
                }
            
            
                else if (!userExist2) {
                    if (usere2 == 0) {
                    User.findOne({ email: email }).then(async (userExist) => {
                    
                    if (userExist){
                        return res.status(222).json({ error: "Email already Exist"})
                    }else{
                        console.log("line 544444444444 strat user storing");
                        var namelower = name.toLowerCase();
                        console.log("namewwwwwwwwwwww" + namelower);
                        const user = new User({ name: namelower, email: email, password: password, cpassword: cpassword,UserRole:"Normal",UserVerified:"No"});
                        
                        const alltoken = await user.generateAuthToken();
                        console.log("google iiiii good");
                        const token = alltoken[1];
                        const retoken = alltoken[2];
                        console.log("cholooo end " + alltoken);
                        process.env.jwt_token = token;

                        // const user = new User({ name, email: email.toLowerCase()(), password, cpassword});
                        // const token = user.generateAuthToken();
                        // console.log('okeetioooooooo')
                        const channel = new Channel({ name: namelower, ChannelStatus: 'Normal', ChannelLastActivatitydate:date,ChannelProfilePicLink: profilepic==""?"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg":profilepic,ChannelbannerPicLink:"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",ChannelDescription:"Hey I created This Channel To Gain Knowladge",TotalChannelWatchTime:"0",TotalChannelViews:0,channelcreateddate:date,channeltags:namelower,channeluniquelink:'null',channellevel:'0',TotalNoOfSubscriber:0});
                        const channelinfo = await channel.save().then(() => {
                            console.log(channel.name);
                        }).catch((err) =>
                            console.log(err));
                            console.log(channelinfo);
                        const userinfo = await user.save().then(() => {
                            console.log(typeof (alltoken));
                            console.log("josjsj");
                            // var username_useremail= [name,email]
                            res.setHeader('username_useremail', namelower);
                            res.send(alltoken);
                            // res.status(200).send("alll ok")
                            // console.log(user._id);
                        }).catch((err) =>
                            console.log(err));
                        }

                    // console.log(done + "line 151111111111");
                    // res.setHeader('username_useremail',name);
                    // res.send(alltoken);





                }).catch((err) => { console.log(err); });}}}).catch((err) => { console.log(err); });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;