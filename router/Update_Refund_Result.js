const express = require('express');
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cloudinary = require("../db/cloudinaryconfig");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const Razorpay = require('razorpay');
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

router.post('/UpdateRefundResult',upload.array("image",3),  async (req, res ) => {

    try {
    console.log("enteringggg to UpdateRefundResult");
    console.log(req.files.length);
    var type = req.header("type");
    var ismoneyreunfd = req.header("isMonetRefunded");
    var isrefundsellerresponse = req.header("isrefundsellerresponse");
    var indexx = parseInt(req.header("indexx"), 10);
    var index =  parseInt(req.header("index"), 10);
    var newHeaders = [];
    newHeaders = req.header("authorization").split(",");
    var lastworkdatetime = req.header("Lastworkdate");
    console.log(req.header("authorization")+"hiii");
    // const productata = JSON.parse(req.body);
    console.log(JSON.parse(req.body.json)); //this is the productmodel coming from flutter
    console.log("req.body[1]");
      // var newHeaders = headers.split(",");
    const devicenum = newHeaders[0].slice(1, 2);
    console.log(devicenum);
    process.env.jwt_token = newHeaders[1].slice(1,);
    console.log(process.env.jwt_token);
    process.env.DeviceId=devicenum;
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
            Customer.findOne({ "uniqueid" : product_json.uniqueid }).then(async (userExist) => {
                if (userExist) {
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
                    console.log(typeof(indexx)+"iiiiikkkkkkk");
                  if(isrefundsellerresponse=="Payoco") { if(type=="true"){console.log( product_json.not_recived_query[indexx].buyer_query[0].query_photos_link);
                    
                    product_json.final_refund_query_result[index].query_photos_link=imageurl;
                        
                    const customerinfo = await Customer.updateMany({ "uniqueid": product_json.uniqueid },
                            { "$set": { "final_refund_query_result": product_json.final_refund_query_result ,  "Assign_Moderator": product_json.Assign_Moderator,  "isMoney_refunded": product_json.isMoney_refunded, "issellerscammer": product_json.issellerscammer,"iscustomerscammer": product_json.iscustomerscammer,"isrefund_rejected": product_json.isrefund_rejected ,   "LastUpdateWork": "DealKaro Response To Seller",
                            "LastUpdatetime": lastworkdatetime,  //"isRefundQuaery_raised":true
                        }, });

                        console.log("ismoney refunded");
                        console.log(product_json.isMoney_refunded);
                    if(product_json.isMoney_refunded==true) {
                        var instance = new Razorpay({
                            key_id: 'rzp_test_QSvlrPYLYsBH64',
                            key_secret: 'ShRicA8weoAPK7oOmkYpyHXL',
                          });
                        var options = {
                            "amount": product_json.paydetails[0].payamount*100,
                            "speed": "normal",
                            "notes": {
                                  "customer_unique_id": product_json.uniqueid
                                },
                            "receipt": "Receipt No. 31",
                            // amount: product_json.paydetails[0].payamount*100,  // amount in the smallest currency unit
                            // currency: "INR",
                            //payment_id: product_json.paydetails[0].payment_id,
                            // notes: {
                            //     key_id: 'rzp_test_QSvlrPYLYsBH64',
                            //     key_secret: 'ShRicA8weoAPK7oOmkYpyHXL', 
                            // }
                          };
                        try{

                            // instance.payments.refund(product_json.paydetails[0].payment_id,{
                            //     "amount": product_json.paydetails[0].payamount*100,
                            // "speed": "normal",
                            // "notes": {
                            //       "customer_unique_id": product_json.uniqueid
                            //     },
                            // "receipt": "product_json.uniqueid",
                            //   }).then(async (user44) => {
                            //     console.log(user44)
                            //   });
                            // console.log("hello let get");
                           // console.log(zse);
                        instance.payments.refund(product_json.paydetails[0].payment_id,options, async  function(err, order)  {
                                if(err) {
                                    console.log(err);
                                } else{console.log(order);
                                    console.log(order.id);
                                    // const timeElapsed = Date.now();
                                    // const today = new Date(timeElapsed);
                                    // var kk=today.toDateString();
                                    console.log("kk");
        
                                    const customerinfo5 = await Customer.updateOne({ "uniqueid": product_json.uniqueid },
                                    { "$set": { "transaction_closed": true  , "LastUpdateWork": "Money Refunded",
                                    "LastUpdatetime": lastworkdatetime,//"isRefundQuaery_raised":true 
                                }, });
                                }
        
                          });
                        
                        }catch(err) {
                            console.log("line no 174"+err[0]);
                            
                          }
                    }
                    console.log(customerinfo);

                    const done = await User.updateOne({ name:product_json.seller_name },
                        { "$push": { "unsendmsg": { "message": "DealKaro Response To Seller", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                        const done2 = await User.updateOne({ name:product_json.Customername },
                            { "$push": { "unsendmsg": { "message": "DeBuyer Raised 2nd Query", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                       
                    console.log(done);
                    console.log(done2);
                    }
                    
                    else if(type=="false") {
                        console.log( product_json.second_raised_refund_quaery[product_json.second_raised_refund_quaery
                            .length-1]);
                            console.log("he;lo ")
                        product_json.second_raised_refund_quaery[product_json.second_raised_refund_quaery
                            .length-1].Payoco_response[0].query_photos_link=imageurl;
                        const customerinfo = await Customer.updateMany({ "uniqueid": product_json.uniqueid },
                        { "$set": { "second_raised_refund_quaery": product_json.second_raised_refund_quaery ,  "LastUpdateWork": "DealKaro Ask Query",
                        "LastUpdatetime": lastworkdatetime, }, });
                        console.log(customerinfo);

                        console.log("ismoney refunded");
                        console.log(product_json.isMoney_refunded);
                    
                        console.log(customerinfo);

                        const done = await User.updateOne({ name:product_json.seller_name },
                            { "$push": { "unsendmsg": { "message": "DealKaro Response To Seller", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                            const done2 = await User.updateOne({ name:product_json.Customername },
                                { "$push": { "unsendmsg": { "message": "DealKaro Response To Buyer", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                        
                        console.log(done);
                        console.log(done2);
                    }} else if(isrefundsellerresponse=="Seller") {
                        console.log( product_json.second_raised_refund_quaery[index]);
                            console.log("he;lo ")
                        product_json.second_raised_refund_quaery[index].seller_response[0].query_photos_link=imageurl;
                        const customerinfo = await Customer.updateMany({ "uniqueid": product_json.uniqueid },
                        { "$set": { "second_raised_refund_quaery": product_json.second_raised_refund_quaery ,   "LastUpdateWork": "Seller Answer 2nd Query",
                        "LastUpdatetime": lastworkdatetime,}, });
                        console.log(customerinfo);

                        console.log("ismoney refunded");
                        console.log(product_json.isMoney_refunded);
                    
                        console.log(customerinfo);

                       // const done = await User.updateOne({ name:product_json.seller_name },
                           // { "$push": { "unsendmsg": { "message": "Seller_Response_seller", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                            const done2 = await User.updateOne({ name:product_json.Customername },
                                { "$push": { "unsendmsg": { "message": "Seller Answer 2nd Query", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                        
                        //console.log(done);
                        console.log(done2);
                    } else if(isrefundsellerresponse=="Buyer") {
                        console.log( product_json.second_raised_refund_quaery[index]);
                            console.log("he;lo ")
                        product_json.second_raised_refund_quaery[index].buyer_response[0].query_photos_link=imageurl;
                        const customerinfo = await Customer.updateMany({ "uniqueid": product_json.uniqueid },
                        { "$set": { "second_raised_refund_quaery": product_json.second_raised_refund_quaery ,  "LastUpdateWork": "Buyer Raised 2nd Query",
                        "LastUpdatetime": lastworkdatetime, }, });
                        console.log(customerinfo);

                        console.log("ismoney refunded");
                        console.log(product_json.isMoney_refunded);
                    
                        console.log(customerinfo);

                        const done = await User.updateOne({ name:product_json.seller_name },
                            { "$push": { "unsendmsg": { "message": "Buyer Raised 2nd Query", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                            //const done2 = await User.updateOne({ name:product_json.Customername },
                             //   { "$push": { "unsendmsg": { "message": "Seller Answer 2nd Query", "incomingsocketid": JSON.stringify(product_json) } }, }, { upsert: false, strict: false });
                        
                        console.log(done);
                        //console.log(done2);
                    }
                
                    

                    const user = await User.findOne({ "name":  product_json.Customername })
                    const user2 = await User.findOne({ "name": product_json.seller_name})
                
                    console.log("user");
        
                    if(user.UserStatus=="online") {
                  
                    console.log("user");
        
                    global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                            console.log('messag is', "messag");
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
                                    console.log("ioo"+"ioooooooooooooooo");
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
                    if(user2.UserStatus=="online") {
                  
                        console.log("user2");
            
                        global.io.to(user2.socketid).emit("newmessage",  user2.unsendmsg , async function( error ,messag ) {
                                console.log('messag is', "messag");
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
                                        console.log("ioo"+"ioooooooooooooooo");
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





                    res.status(201).send(imageurl);
            
                    
                } else if (!userExist) {
                    console.lig("hello not exist");
                    res.status(202).send("not exist");
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