const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
// app.use(express.json());

require('../db/conn');
const User = require('../model/userSchema');
const tokt = User({});


async function clearusers(mail,md) {
    
    const user = await User.findOne({ email: mail })
    const _id = user._id;
    // const token = user.tokens[0]["token"]
    console.log("start mdmultiuser");
    try {
        // const user = await User.findOne({ email: mail })
        // const _id = user._id;
        // console.log("mkiooooooo" +  user.tokens);
        
        // const user = await User.findOne({ email: mail })
        // const _id = user._id;
        var mdd = ("md"+md+"token");
        if (md == 1) {
            // const user = await User.findOne({ email: mail })
            // const _id = user._id;
            
            if (user.tokens[0][mdd] == "null") {
                console.log("at md1 block if");
                const done = await User.updateOne({ _id:_id},
                    { "$set": { "tokens.0.md1token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({ _id:_id},
                    { "$set": { "retokens.0.md1retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else");
                const done = await User.updateOne({_id:_id },
                    { "$set": { "tokens.0.md1token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id },
                    { "$set": { "retokens.0.md1retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            
            return true;
        } else if (md == 2) {
            if (user.tokens[0][mdd] == "null") {
                console.log("at md2 block if");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md2token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md2retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else");
                const done = await User.updateOne({_id:_id },
                    { "$set": { "tokens.0.md2token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md2retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            
            return true;
        } else if (md == 3) {
            if (user.tokens[0][mdd] == "null") {
                console.log("at md3 block if");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md3token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md3retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else 3");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md3token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md3retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            return true;
        } else if (md == 4) {
            if (user.tokens[0][mdd] == "null") {
                console.log("at md4 block if");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md4token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md4retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else 3");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md4token": "null" }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md4retoken": "null" } },{upsert:true,strict:false});
                console.log(mdone);
            }
            return true;
        }
        
    } catch (error) {
        console.log(error);
        // res.send("the error part of getauthtoken" + error);

    }
    console.log(token);
}


async function mdusers(mail,md) {
    
    const user = await User.findOne({ email: mail })
    const _id = user._id;
    // const token = user.tokens[0]["token"]
    console.log("start mdmultiuser");
    try {
        // const user = await User.findOne({ email: mail })
        // const _id = user._id;
        // console.log("mkiooooooo" +  user.tokens);
        const ttoken = await jwt.sign({ _id: _id.toString() }, process.env.TOKEN_SECRET, {expiresIn: "10 days"});

        const retoken = await jwt.sign({ _id: _id.toString()}, process.env.R_TOKEN_SECRET, {
            expiresIn: "30 days"
        });
        // const user = await User.findOne({ email: mail })
        // const _id = user._id;
        var mdd = ("md"+md+"token");
        if (md == 1) {
            // const user = await User.findOne({ email: mail })
            // const _id = user._id;
            console.log("mkiooooooo" +  user.tokens);
            
            if (user.tokens[0][mdd] == "null") {
                console.log("at md1 block if");
                const done = await User.updateOne({ _id:_id},
                    { "$set": { "tokens.0.md1token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({ _id:_id},
                    { "$set": { "retokens.0.md1retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else");
                const done = await User.updateOne({_id:_id },
                    { "$set": { "tokens.0.md1token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id },
                    { "$set": { "retokens.0.md1retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            // await user.save();
            // console.log(this.tokens);
            process.env.jwt_token = ttoken;
            process.env.jwt_retoken = retoken;
            console.log(ttoken +"this is retoken from login multiusers");
            console.log(user);
            console.log("this idd from genetrate");
            return [1,ttoken, retoken];
        } else if (md == 2) {
            if (user.tokens[0][mdd] == "null") {
                console.log("at md2 block if");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md2token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md2retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else");
                const done = await User.updateOne({_id:_id },
                    { "$set": { "tokens.0.md2token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md2retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            // await user.save();
            // console.log(this.tokens);
            process.env.jwt_token = ttoken;
            process.env.jwt_retoken = retoken;
            console.log(ttoken +"this is retoken from login multiusers");
            console.log(user);
            console.log("this idd from genetrate");
            return [2,ttoken, retoken];
        } else if (md == 3) {
            if (user.tokens[0][mdd] == "null") {
                console.log("at md3 block if");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md3token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md3retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else 3");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md3token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md3retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            // await user.save();
            // console.log(this.tokens);
            process.env.jwt_token = ttoken;
            process.env.jwt_retoken = retoken;
            console.log(ttoken +"this is retoken from login multiusers");
            console.log(user);
            console.log("this idd from genetrate");
            return [3,ttoken, retoken];
        } else if (md == 4) {
            if (user.tokens[0][mdd] == "null") {
                console.log("at md4 block if");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md4token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md4retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            else {
                console.log("at md1 block else 3");
                const done = await User.updateOne({_id:_id},
                    { "$set": { "tokens.0.md4token": ttoken }, },{upsert:true,strict:false});
                console.log(done);
                const mdone = await User.updateOne({_id:_id},
                    { "$set": { "retokens.0.md4retoken": retoken } },{upsert:true,strict:false});
                console.log(mdone);
            }
            // await user.save();
            // console.log(this.tokens);
            process.env.jwt_token = ttoken;
            process.env.jwt_retoken = retoken;
            console.log(ttoken +"this is retoken from login multiusers");
            console.log(user);
            console.log("this idd from genetrate");
            return [4,ttoken, retoken];
        }
        
    
        //to veryfy and get the data from the token we just verify the token by prvide him the secrect key
        // const tokenverfication = await jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(tokenverfication);
    } catch (error) {
        console.log(error);
        // res.send("the error part of getauthtoken" + error);

    }
    console.log(token);
}


async function multiuser(mail) {
    
    const user = await User.findOne({ email: mail })
    const _id = user._id;
    // const token = user.tokens[0]["token"]
    console.log("start");
    try {
        console.log("rrrrrrrrrr");
        const ttoken = await jwt.sign({ _id: _id.toString() }, process.env.TOKEN_SECRET, {
            expiresIn: "10 days"
        });

        const retoken = await jwt.sign({ _id: _id.toString()}, process.env.R_TOKEN_SECRET, {
            expiresIn: "30 days"
        });
        // const done = await User.updateOne({ "tokens.token": "null" },
        //     { "$set": { "tokens.$.token": ttoken } });
        // const mdone = await User.updateOne({ "retokens.retoken": "null" },
        //     { "$set": { "retokens.$.retoken": retoken } });
        // console.log(done);
        const done = await User.updateOne({ _id:_id},
            { "$set": { "tokens.0.token": ttoken }, },{upsert:false,strict:false});
        console.log(done);
        const mdone = await User.updateOne({ _id:_id},
            { "$set": { "retokens.0.retoken": retoken } },{upsert:false,strict:false});
        console.log(mdone);
        // await user.save();
        // console.log(this.tokens);
        process.env.jwt_token = ttoken;
        process.env.jwt_retoken = retoken;
        console.log(ttoken +"this is retoken from login multiusers");
        const user2 = await User.findOne({ email: mail })
        console.log(user2);
        console.log("this idd from genetrate");
        return [0,ttoken, retoken];
    
        //to veryfy and get the data from the token we just verify the token by prvide him the secrect key
        // const tokenverfication = await jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(tokenverfication);
    } catch (error) {
        console.log(error);
        // res.send("the error part of getauthtoken" + error);

    }
    console.log(token);
}



// router.get('/' , (req, res) => {
//     res.send(`hello my homepage from auth router`);

// });

//now to send data we use get but to read coming data
            // we use post now let think user send json data on /registering page
router.post('/login', async (req, res) => {
    console.log("enter to login");
    const {email, password} = req.body;
    console.log(email);
    console.log(req.body);

    if(!email || !password){
        return res.send.json({error: "plz type all field"});
    };

    User.findOne({email:email}).then(async (userExist)  => {
        if (userExist) {
            const hashedPasswd = await bcrypt.compare(password,userExist.password);
            console.log(hashedPasswd);
            const salt = await bcrypt.genSalt(10);
            const hassh = await bcrypt.hash(password,salt);
            console.log(hassh);
            
            User.findOne({email:email}).then(async (_userExist) => {
                if (_userExist && hashedPasswd) {
                    console.log("okkkk")
                    const user = await User.findOne({ email: email });
                    token = user.tokens[0]["token"];
                    console.log(token);
                    var devicecount = 1;

                    //if user logout token value from mgdb will be removed
                    if (token == "null") {
                        console.log("token null")
                        const alltoken = await multiuser(email);
                        console.log(alltoken + "hleooo");
                        res.setHeader('username_useremail',user.name);
                        res.send(alltoken);
                        return;

                    } else if (token != "null") {
                        for (var i = 1; j = 4, i <= j; i++) {
                            console.log(devicecount)
                            var varr = ("md"+i+"token");
                            // console.log(user.tokens[i])
                            if (user.tokens[0][varr] == null || user.tokens[0][varr] == "null") {
                                console.log("message");
                                // var varr = ("md"+i+"token");
                                // console.log(user.tokens[0][varr]);
                                const alltoken = await mdusers(email, i);
                                console.log(alltoken);
                                res.setHeader('username_useremail',user.name);
                                res.status(201).send(alltoken);
                                break;
                            }
                            devicecount += 1
                        }
                        if (devicecount == 5) {
                            for (var i = 1; j = 4, i <= j; i++) {
                                var resu= await clearusers(email,i)
                             };
                             console.log("token first not null")
                             const alltoken = await multiuser(email);
                             console.log(alltoken + "hleooo");
                             res.setHeader('username_useremail',user.name);
                             res.send(alltoken);
                             return;
                            // res.status(230).send("You Already Logged In On 5 Device Logout First");
                            // return;
                        }
                    }
                } else {
                    
                    res.status(220).send("invalid credential");
                }
                
                // res.send("alltoken");

            }).catch((err) => {
                // res.status(500).send("invalid credential");
                console.log(err);
            });
            // return res.status(422).json({ error: "Email already Exist"})
        } else {
            res.status(222).send("no account found")
            console.log("bhai bhai")
            return;
        };

    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;