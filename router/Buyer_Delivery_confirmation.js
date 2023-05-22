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
const Customer = require("../model/customers_model");
const jwtauth = require('./jwt_auth');
const { json } = require('express');

router.post('/Delivery_confirmation',  async (req, res ) => {

    console.log('connection of Delivery_confirmation check done');
    console.log(req.body);
    // res.status(201).send("url");
    //validating jwttoken
    try {
      console.log("enteringggg to Delivery_confirmation");
      var newHeaders = [];
      newHeaders = req.header("authorization").split(",");
      console.log(req.header("authorization")+"hiii");
      // console.log(req.header("size") + "hiii");
      var sellerresponse = req.header("buyerresponse");
      // var page = req.header("page");
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
      console.log(process.env.jwt_retoken);
      console.log(typeof(headers));
      if (devicenum == 9) {
              res.status(401).send();
      }
  
      
  
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
    
    if (refer == true) {
        console.log(User)
        if (devicenum == 1 || devicenum == 2 || devicenum == 3 || devicenum == 4 || devicenum == 0) {
            console.log('under refer==true');
            var product_json = req.body;
            console.log(product_json);
            Customer.findOne({ "uniqueid" : product_json.uniqueid }).then(async (userExist) => {
                if (userExist) {
                    console.log("userExist")
                    
                    if (0==0) {
                        
                        console.log("saving customerdetails");
                        const customerinfo = await Customer.updateMany({ "uniqueid": product_json.uniqueid },
                            { "$set": { "Seen_Details": product_json.Seen_Details , "delivered_details":product_json.delivered_details , "isproductok":"Ok" }, });
                        console.log(customerinfo);

                        const done = await User.updateOne({ name: product_json.seller_name },
                            { "$push": { "unsendmsg": { "message": "Buyer Confirm The Delivery", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                        const user = await User.findOne({ "name": product_json.seller_name })
                        console.log(done);
                    
                        console.log(user);
            
                        if(user.UserStatus=="online") {
                
                        console.log(done);
                      
                        console.log(user);
            
                        global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                                console.log('messag is', messag);
                                global.io.on("newmessconfirm", async (alltoken, callback) => {
                                    console.log(alltoken+"newmessconfirm");
                                    console.log("newmessconfirm");
                                    console.log("newmessconfirm");
                                    console.log("newmessconfirm");
                                    console.log("newmessconfirm");
                                    var newHeaders = [];
                                    newHeaders = alltoken.split(",");
                                    if (newHeaders.length < 2) {
                                        return;
                                    }
                                    const devicenum = newHeaders[0].slice(1, 2);
                                    console.log(devicenum);
                                    dn = devicenum;
                                    process.env.DeviceId=devicenum;
                                    process.env.jwt_token = newHeaders[1].slice(1,);
                                    console.log(process.env.jwt_token);
                                    process.env.jwt_retoken = newHeaders[2];
                                    process.env.jwt_retoken = process.env.jwt_retoken.slice(1, (process.env.jwt_retoken.length - 1));
                                    console.log(process.env.jwt_retoken);
                                    var refer = await jwtauth();
                                    var verifyuser;
                                    // if (devicenum == 9||refer==false) {
                                    //     console.log("lppppppppppppppppppppppppp line 140");
                                    //     socket.disconnect();
                                    //     return;
                                    // }
                                    var id;
                                    try {
                                        const verifyUser = jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
                                    
                                        verifyuser = verifyUser;
                                        const ioo = await User.findOne({ "_id": verifyuser });
                                        console.log(ioo+"ioooooooooooooooo");
                                        if (ioo == null) {
                                            console.log("lppppppppppppppppppppppppp line 140");
                                            socket.disconnect();
                                            return;
                                        }
                                        dn = true;
                                        if(refer==true) {
                                            await ioo.updateOne({ "name": ioo.name },{ "$set": { 'unsendmsg': [] } });
                                        }

                                        console.log("singing...............");
                                        console.log("in...............");
                                    } catch (err) {
                                        if (err instanceof jwt.TokenExpiredError) {
                                            console.log("ookkk return from user object id verification");
                                            refer = false;
                                            console.log(err);
                                        }
                                    }
                                    
                                    });
                        } );
                        
                ///// 
                /////
                /////
                /////
                /////       
    
                          
                        }
                        
                        res.status(201).send("save");
                        return; }
                    
                } else if (!userExist) {
                    console.log("saving no nono exist");
                    
                    
                    res.status(202).send("no");
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