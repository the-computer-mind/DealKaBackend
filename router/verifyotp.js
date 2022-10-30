const express = require('express');
const router = express.Router();
const app = express();
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const otpgenerator = require("otp-generator"); 
// app.use(express.json());
dotenv.config({path: '../config.env'});
require('../db/conn');
const User = require('../model/userSchema');
const Channel = require('../model/channeldescription');
const OtpM = require('../model/otpSchema');
const userSchema = require('../model/userSchema');
const MultipleTry = require('../model/multipletrySchema');
const jwtauth = require('./jwt_auth');

//now to send data we use get but to read coming data
            // we use post now let think user send json data on /registering page
router.post('/verifyotp', async (req, res) => {
    try {
        const { otp } = req.body;
        console.log(otp + "it is your otooooooppp");
        var newHeaders = [];
        newHeaders = req.header("authorization").split(",");
        var date = req.header("Date");
        console.log(date + "time");
        console.log(req.header("authorization")+"hiii");
        // // const productata = JSON.parse(req.body);
        // console.log(JSON.parse(req.body.json)); //this is the productmodel coming from flutter
        console.log("req.body[1]");
        // var newHeaders = headers.split(",");
        const devicenum = newHeaders[0].slice(1, 2);
        console.log(devicenum);
        process.env.jwt_token = newHeaders[1].slice(1,);
        console.log(process.env.jwt_token);
        process.env.jwt_retoken = newHeaders[2];
        process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
        console.log(process.env.jwt_retoken);
        console.log("typeof (headers)");
        var refer = false;
        // var refer = await jwtauth();
        var verifyuser;
        try {
            const verifyUser = await jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
            verifyuser = verifyUser;
            refer = true;
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                console.log("ookkk return from user object id verification");
                refer = false;
                console.log(err);
            }
        }
        console.log(refer + "referrrr");

        if (refer == true) {
            console.log("under refer==true line 56 of verifyotp");
            const otpin = await OtpM.findOne({ _id: verifyuser });
            console.log(otpin);
            if (otpin != null || otpin != undefined) {
                console.log(" under line 59 of verify to");
                const done2 = await MultipleTry.findOne({ number: otpin.number });
                console.log(done2+"line 62mmmmmmmmmm");
                var totaltimes;
                if (done2.otpentertimes != null) {
                    totimes = 1 + done2.otpentertimes;
                    console.log(done2.otpentertimes + "line 66mmmmmmmmmm");
                } else {
                    totimes = 1;
            }
            const done = await MultipleTry.updateOne({ number: otpin.number },
                { "$set": { "otpentertimes": totaltimes }, },{upsert:false,strict:false});
            console.log(done + "line 72mmmmmmmmmm");
            }
            
            if (otpin != null) {
                console.log("line 76mmmmmmmmmm");
                const done3 = await MultipleTry.findOne({ number: otpin.number });
                console.log(done3.otpentertimes);
                if (10 >= done3.otpentertimes && done3.otpentertimes!=undefined) {
                    console.log("line 79mmmmmmmmmm");
                    async function verifyotp(params) { 
                    console.log("line 81mmmmmmmmmm"+params);
                    console.log("call verifyotp");
                    let [hashValue, expires] = params.split('.');
                    // const ttl = 3 * 60 * 1000 //thats mean 3mintues expiry time
                    let now = Date.now();
                    if (now > parseInt(expires)) return 0; //time expired
                    let data = `${otpin.number}.${otp}.${expires}`;
                    let newCalculatedHash = crypto.createHmac("sha256", process.env.passwordhashKey).update(data).digest("hex");
                    if (newCalculatedHash === hashValue) {
                        return 1; //if otp matched and valid
                    };
                    return 2; //not matched

                }
               
                const getvalue = await verifyotp(otpin.otp);
                console.log("line 92mmmmmmmmmm"+getvalue);
                if (getvalue == 1) {
                    console.log("line 944444mmmmmmmmmm");
                    var namelower = otpin.name.toLowerCase();
                    console.log("namewwwwwwwwwwww" + namelower);
                    const user = new User({ name: namelower, email: otpin.number, password: otpin.password, cpassword: otpin.cpassword,UserRole:"Normal",UserVerified:"No"});
                    
                    const alltoken = await user.generateAuthToken();
                    console.log("sall good");
                    const token = alltoken[1];
                    const retoken = alltoken[2];
                    console.log("cholooo end " + alltoken);
                    process.env.jwt_token = token;

                    // const user = new User({ name, email: email.toLowerCase()(), password, cpassword});
                    // const token = user.generateAuthToken();
                    // console.log('okeetioooooooo')
                    const channel = new Channel({ name: namelower, ChannelStatus: 'Normal', ChannelLastActivatitydate:date,ChannelProfilePicLink:"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",ChannelbannerPicLink:"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",ChannelDescription:"Hey I created This Channel To Spread Knowladge",TotalChannelWatchTime:"0",TotalChannelViews:0,channelcreateddate:date,channeltags:namelower,channeluniquelink:'null',channellevel:'0',TotalNoOfSubscriber:0});
                    const channelinfo = await channel.save().then(() => {
                        console.log(channel.name);
                    }).catch((err) =>
                        console.log(err));
                        console.log(channelinfo);
                    const userinfo = await user.save().then(() => {
                        console.log(typeof (alltoken));
                        console.log("josjsj");
                        // var username_useremail= [name,email]
                        res.setHeader('username_useremail', otpin.name);
                        res.send(alltoken);
                        // res.status(200).send("alll ok")
                        // console.log(user._id);
                    }).catch((err) =>
                        console.log(err));
                    

                } else if (getvalue == 2) { 
                    console.log("line 119mmmmmmmmmm");
                    res.setHeader('username_useremail', "otpin.name");
                    return res.status(222).json({ error: "Wrong Otp" });
                } else if (getvalue == 0) { 
                    console.log("line 119mmmmmmmmmm");
                    res.setHeader('username_useremail', "otpin.name");
                    return res.status(228).json({ error: "Otp Expired" });///otp epired 3min gone
                }}
            } else {
                console.log("line 124mmmmmmmmmm");
                res.setHeader('username_useremail', "otpin.name");
                return res.status(225).json({ error: "time out" }); //too many attems block
            }
        } else {
            res.setHeader('username_useremail', "otpin.name");
                return res.status(226).json({ error: "nor singup but try to verify" }); //refer false many attems block
        }


            // User.findOne({email:email}).then(async (userExist)  => {
            //     if (userExist){
            //         return res.status(222).json({ error: "Email already Exist"})
            //     };
            //     //else part
            //     // encryptedPassword = bcrypt.hash(password, 10);
            //     // encrypteCpassword = bcrypt.hash(cpassword, 10);
            //     // const tokt = User({});
            //     var tokens = [];
            //     // console.log("sall good");
            //     // const token = await tokt.generateAuthToken();
            //     // this.tokens = this.tokens.concat({ token: ttoken });
            //     // console.log("bhai bhai bhai" + token);

            //     //set the cookie using the name is just a name anything and that name contain the value which is token here
            //     //
            //     //res.cookie(name, value, [options])
            //     //optintion is expires in mili sce
            //     //http only means no client cher khani with token
            //     // res.cookie("jwt", token, {expires: new Date(Date.now() + 300000), httpOnly:true});
            //     // console.log(cookie);
            //     async function createOtp(phone) {
            //         const otp = otpgenerator.generate(6, {
            //             lowerCaseAlphabets: false,
            //             upperCaseAlphabets: false,
            //             alphabets: false,
            //             specialChars: false,
            //         });
            //         const ttl = 3 * 60 * 1000 //thats mean 3mintues expiry time
                    
            //         const expires = Date.now() + ttl;
            //         const data = `${phone}.${otp}.${expires}`;
            //         const hash = crypto.createHmac("sha256", process.env.passwordhashKey).update(data).digest("hex");
            //         const fullHash = `${hash}.${expires}`;

            //         console.log(`Your otp is ${otp}`);
            //         //send sms
            //         return fullHash;
            //     };

            //     async function verifyotp(params) { 
            //         let [hashValue, expires] = params.hash.split('.');

            //         let now = Date.now();
            //         if (now > parseInt(expires)) return 0; //time expired
            //         let data = `${params.phone}.${params.otp}.${expires}`;
            //         let newCalculatedHash = crypto.createHmac("sha256", process.env.passwordhashKey).update(data).digest("hex");
            //         if (newCalculatedHash === hashValue) {
            //             return 1; //if otp matched and valid
            //         };
            //         return 2; //not matched

            //     }

            //     var otphash = await createOtp(email);
            //     const otpm = new OtpM({ name, email: email, otp: otphash ,  password, cpassword,});
            //     const otpinfo = await otpm.save().then(() => {
            //         console.log(typeof (alltoken));
            //         console.log("josjsj");
            //         // var username_useremail= [name,email]
            //         res.setHeader('username_useremail',name);
            //         res.send(alltoken);
            //         // res.status(200).send("alll ok")
            //         // console.log(user._id);
            //     }).catch((err) => 
            //     console.log(err));



            //     const user = new User({ name, email: email.toLowerCase()(), otp: otphash ,  password, cpassword,});
            //     const alltoken = await user.generateAuthToken();
            //     console.log("sall good");
            //     const token = alltoken[1];
            //     const retoken = alltoken[2];
            //     console.log("cholooo end "+ alltoken);
            //     process.env.jwt_token = token;

            //     // const user = new User({ name, email: email.toLowerCase()(), password, cpassword});
            //     // const token = user.generateAuthToken();
            //     // console.log('okeetioooooooo')
            //     const userinfo = await user.save().then(() => {
            //         console.log(typeof (alltoken));
            //         console.log("josjsj");
            //         // var username_useremail= [name,email]
            //         res.setHeader('username_useremail',name);
            //         res.send(alltoken);
            //         // res.status(200).send("alll ok")
            //         // console.log(user._id);
            //     }).catch((err) => 
            //     console.log(err));


            // }).catch((err) => { console.log(err); });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;