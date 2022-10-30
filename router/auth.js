const express = require('express');
const router = express.Router();
const app = express();
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const otpgenerator = require("otp-generator"); 
const userSchema = require('../model/userSchema');


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


//firebase
// admin.initializeApp({
//     credential: admin.credential.cert(credential)

// });





// router.get('/' , (req, res) => {
//     res.send(`hello my homepage from auth router`);

// });

//now to send data we use get but to read coming data
            // we use post now let think user send json data on /registering page
router.post('/sendotp', async (req, res) => {
    try {
            const { name, email, password, cpassword } = req.body;
            console.log(name);
            console.log(email);
            console.log(req.body);
            console.log("namewwwwwwwwwwww" + name.toLowerCase());

            if(!name || !email || !password || !cpassword){
                return res.send.json({error: "plz type all field"});
            };
            var complete = 0;
            OtpM.findOne({ number: email.toString() }).then(async (userExist4) => {
                if (userExist4) {
                    console.log("line 40 kkkkkkkkkkkkkkkkkkkkkk");
                    complete = 1;
                    return res.status(224).json({ error: "Wait For Few Minuties before sending again" });
                }
            
                else if (!userExist4) {
                console.log(complete + "oooooooooooooooooooo");
                if (complete == 1) {
                    console.log("i am line 46 returnung");
                    return;
                } else {
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
                            };
                            const tryt = await MultipleTry.findOne({ number: email });
                            if(tryt!=null) {if(tryt.trytimes==5 || tryt.trytimes>5)  {
                                return res.status(225).json({ error: "Temporary Block Try After 24hours" });
                            }}


                            //else part
                            // encryptedPassword = bcrypt.hash(password, 10);
                            // encrypteCpassword = bcrypt.hash(cpassword, 10);
                            // const tokt = User({});
                            var tokens = [];
                            async function createOtp(phone) {
                                const otp = otpgenerator.generate(6, {
                                    lowerCaseAlphabets: false,
                                    upperCaseAlphabets: false,
                                    alphabets: false,
                                    specialChars: false,
                                });
                                const ttl = 3 * 60 * 1000 //thats mean 3mintues expiry time
                                
                                const expires = Date.now() + ttl;
                                const data = `${phone}.${otp}.${expires}`;
                                const hash = crypto.createHmac("sha256", process.env.passwordhashKey).update(data).digest("hex");
                                const fullHash = `${hash}.${expires}`;

                                console.log(`Your otp is ${otp}................ line 86 of autth.js`);
                                console.log(`Your number is ${'+91'+email}................ line 90 of autth.js`);
                                //send sms
                                twillo.messages.create({
                                    from:process.env.twillo_number,
                                    to:"+91"+email,
                                    body:`Hey Quderiya Gulam Your otp is ${otp} to Verify`

                                }).then((resul)=>(console.log(`message otp is send to  ${email}`))).catch((ee)=>(console.log(`your error of twillo is ${ee}`)));
                                //sending te otp to the phone number



                                return fullHash;
                            };

                            var totaltimes = 1;
                            if (tryt != null) {
                                totaltimes = tryt.trytimes + totaltimes;
                            }

                            var otphash = await createOtp(email);
                            var namelower = name.toLowerCase();
                            const otpm = new OtpM({ name:namelower, number: email, otp: otphash, password, cpassword, });

                            
                            const otpinfo = await otpm.save().then(() => {
                                console.log("typeof (alltoken)");
                                console.log("josjsj");
                            }).catch((err) => 
                                console.log(err));
                            console.log(otpinfo + "otp hash saved");
                            
                            const otpin = await OtpM.findOne({ number: email });
                            console.log(otpin._id+"hrtrtegdgggggggdddddddddd");

                            const ttoken = await jwt.sign({ _id: otpin._id.toString() }, process.env.TOKEN_SECRET, {
                                expiresIn: 60000000
                            });
                    
                            const retoken = await jwt.sign({ _id: otpin._id.toString()}, process.env.R_TOKEN_SECRET, {
                                expiresIn: 60000000
                            });
                            const alltoken = [9, ttoken, retoken];
                            if(tryt==null) {const multipletry = new MultipleTry({ number: email, trytimes: totaltimes, otpentertimes:0 });
                            const multipletryinfo = await multipletry.save().then(() => {
                                    console.log("typeof (alltoken)");
                                    console.log("josjsj");
                                    // var username_useremail= [name,email]
                                    res.setHeader('username_useremail',name);
                                    res.send(alltoken);
                                    // res.status(200).send("alll ok")
                                    // console.log(user._id);
                                }).catch((err) => 
                                    console.log(err));
                                console.log(multipletryinfo + "multipletry times saved");
                            } else {
                                const done = await MultipleTry.updateOne({ number: email },
                                    { "$set": {trytimes: totaltimes}, });
                                console.log(done + "line 151111111111");
                                res.setHeader('username_useremail',name);
                                res.send(alltoken);
                            }





                        }).catch((err) => { console.log(err); });}}}).catch((err) => { console.log(err); });
                }} });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;