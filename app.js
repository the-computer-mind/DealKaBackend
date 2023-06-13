const cluster = require("cluster");
const os = require("os");
const mongoose = require('mongoose');
var http = require("http");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const numCpu = os.cpus().length;

const User = require('./model/userSchema');
const Customer = require("./model/customers_model");
//Node_url
//crypto
const cors = require("cors");
app.use(cors());

// app.use(express.limit(100000000));


//connecting mongodb with backend using app code
// app.use(express.json());
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit:'50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

require('./db/conn');
require('./router/jwt_auth');
// const chatUsers = require('./model/chatusers');
const jwtauth = require('./router/jwt_auth');
const { json } = require('express');
const { stringify } = require('querystring');
const { EventEmitter } = require('stream');
// const redisAdapter = require('socket.io-redis');
// const redis = require("redis");
const { promisify } = require('util');
const { CLIENT_RENEG_LIMIT } = require('tls');


var clients = {};
var server = http.createServer(app);
var ioApp = http.createServer(app);

const io = require('socket.io')(ioApp,{
  'pingInterval': 6000,
  'pingTimeout': 10000,
  'transports': ['websocket','polling'],
  cors: true, 
  origin:true, 
  allowEIO3: true,
  //"path": '/socket.io'
  //resource: '/foo/bar/socket.io'

});
global.io = io;
// io.set('heartbeat timeout', 6000);
// io.set('heartbeat interval', 3000);

function st() {
  app.use(cors());

  try {
    app.use(express.json());

    //connecting mongodb with backend using app code
    dotenv.config({ path: "./config.env" });
    require("./db/conn");
    //using middleware we execute this from auth to here require function is like next()
    app.use(require("./router/auth"));
    app.use(require("./router/refercheck"));
    app.use(require("./router/verifyotp"));
    app.use(require("./router/login_load_test"));
    
    app.use(require("./router/login"));
    app.use(require("./router/productadd"));
    console.log("lopppppppppppppppppp");
    app.use(require("./router/logout"));
    app.use(require("./router/refreshtoken"));
    console.log("111111111");
   
    app.use(require('./router/getallproducts'));
    app.use(require('./router/shipment_tracking_update'));
    app.use(require("./router/productadd"));
    app.use(require('./router/productupdatenew'));
    app.use(require('./router/userallproducts'));
    app.use(require('./router/CustomerProductavaliable'));
    app.use(require('./router/generate_order_id'));
    app.use(require('./router/BuyCourse'));
    app.use(require('./router/checkproduct'));
    app.use(require('./router/Allcustomers'));
    app.use(require('./router/delivery_status_update'));
    app.use(require('./router/seller_productavailable'));
    app.use(require('./router/Buyer_Delivery_confirmation'));
    app.use(require('./router/Query_Add'));
    app.use(require('./router/My_Orders'));
    app.use(require('./router/refund_payment'));
    app.use(require('./router/getallvideos'));
    app.use(require('./router/unique_seller_search'));
    app.use(require('./router/getcoursereview'));
    app.use(require('./router/gettAppVersion'));

    app.use(require('./router/deleteproduct'));
    // app.use(require('./router/Getsharefile'));   
    app.use(require('./router/product_open_req'));  
    app.use(require('./router/SharingProduct'));  
    app.use(require('./router/submitCourseReview')); 
    app.use(require('./router/uploadnewappversion')); 
    app.use(require('./router/refund_raised_queries')); 
    app.use(require('./router/Accept_Query_To_Solve')); 
    app.use(require('./router/Moderator_Refund_Queries')); 
    app.use(require('./router/Update_Refund_Result')); 
    app.use(require('./router/getallbanners')); 
    app.use(require('./router/addnewbanners')); 
    app.use(require('./router/Addbankaccount')); 
    app.use(require('./router/Singupstorebygoogleapi')); 
    //socket io program start ......
    //socket io program start ......


  function gettime() {
      let date_time = new Date();
  
      // get current date
      // adjust 0 before single digit date
      let date = ("0" + date_time.getDate()).slice(-2);
      
      // get current month
      let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
      
      // get current year
      let year = date_time.getFullYear();
      
      // get current hours
      let hours = date_time.getHours();
      
      // get current minutes
      let minutes = date_time.getMinutes();
      
      // get current seconds
      let seconds = date_time.getSeconds();
      
      // prints date in YYYY-MM-DD format
      console.log(year + "-" + month + "-" + date);
      
      // prints date & time in YYYY-MM-DD HH:MM:SS format
      console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
      var currentdatatime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
      return currentdatatime;
  };

  var socketid= [];
  var ns;
  // const redisClient = redis.createClient();
  // const redisGetAsync = promisify(redisClient.get).bind(redisClient);
  // var redisClient = redis.createClient('192.168.31.202', 6379);
  
              
    const PORT = process.env.PORT || 8000;
    const Url = process.env.Node_url;
    //exporting user model file
    //const User = require('./model/userSchema');

    //middleware to check if user login then only show some specific page
    const middleware = (req, res, next) => {
      console.log(`hello middleware`);
      //if user login then we execute next by giving a condition
      //because you call next now about page will load
      next();
    };

    app.get("/hm", (req, res) => {
      console.log("under hm home");
      
      res.send(`hello my homepage multi instance of f1 standard`);
    });

    var core=1;
    if(numCpu==1) {
      core=1;
    }else{
      core=1;
    }


    if(cluster.isMaster) {
      for(let i =0;i<core;i++) {
              cluster.fork()
            };
      cluster.on('exit',(worker, code, signal) => {
        console.log(`worker PID ${process.pid} died`);
        cluster.fork();
      })
    }else{
      console.log(numCpu);
      io.on('connection', (socket) => {


        console.log('a user connected' + socket.id);
        socketid[0]=socket.id;
        socket.on("Available",(msg) => {
          console.log(msg);
          io.to(socket.id).emit("recivemsg", "msg");
        });
        socket.on("disconnect", async() => {
          console.log("disconnected " + socket.id);
          const status = await User.updateOne({ "socketid": socket.id },
                      { "$set": { "UserStatus": "offline" } });
          console.log(status);
          // socket.disconnect();
          //             socket.removeAllListener("connection");
          //             socket.removeAllListener("message");
          //             socket.end;      
        });

        socket.on("Available",(msg) => {
          console.log(msg);
          io.to(socket.id).emit("recivemsg", "msg");
        });


        ////
        ///
        //
        //



///signin socket


      socket.on("newmessconfirm", async (alltoken, callback) => {
                                              
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
                var got = await User.updateOne({ "name": ioo.name },{ "$set": { 'unsendmsg': [] } });
                callback();
            }

            console.log("usersendmessg=[]...............");
            console.log("in...............");
            console.log(got);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                console.log("ookkk return from user object id verification");
                refer = false;
                console.log(err);
            }
        }
        
        });
        //////////////////
        ///

        ////
        ///
        socket.on("getpopupobject", async (listoftandu, callback) => {
          console.log(listoftandu);
          var deku = [];
          deku = listoftandu.split("()");
          console.log(deku);

          var alltoken = deku[0];
          var uid = deku[1];
          console.log(alltoken+"getpopupobject");
          console.log("getpopupobject");
          console.log("getpopupobject");
          console.log("getpopupobject");
          console.log("getpopupobject");
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
          if (devicenum == 9||refer==false) {

              console.log("lppppppppppppppppppppppppp line 140");
              socket.disconnect();
              return;
          }
          var id;
          try {
            console.log(refer);
            console.log("refer");
              const verifyUser = jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
          
              verifyuser = verifyUser;
              console.log("byby");
              //const ioo = await User.findOne({ "_id": verifyuser });
              // console.log(ioo+"ioooooooooooooooo");
              // if (ioo == null) {
              //     console.log("lppppppppppppppppppppppppp line 140");
              //     socket.disconnect();
              //     return;
              // }
              dn = true;
              if(refer==true) {
                console.log("customer1");
                const customer1 = await Customer.findOne(
                   {'uniqueid': uid}
                  );
              console.log(customer1);
              
                  // await ioo.updateOne({ "name": ioo.name },{ "$set": { 'unsendmsg': [] } });
              callback(customer1);
              }
  
              console.log("getobjectfrompopup...............");
              console.log("in...............");
          } catch (err) {
              if (err instanceof jwt.TokenExpiredError) {
                  console.log("ookkk return from user object id verification");
                  refer = false;
                  console.log(err);
              }
          }
          
          });


        //
        ///
        ///

        socket.on("signin", async (alltoken, callback) => { //msg is sending the msg from flutter client
          console.log(alltoken+"hiiiiiiiiiiiiiiiiiiiii");
          
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

              console.log("singing.......");
              console.log("in.....");
          } catch (err) {
              if (err instanceof jwt.TokenExpiredError) {
                  console.log("ookkk return from user object id verification");
                  refer = false;
                  console.log(err);
              }
          }
          
          if (refer == true) {
              console.log("socket");

              const mdone = await User.updateOne({ "_id": verifyuser },
                  { "$set": { "socketid": socket.id , "UserStatus": "online" } });
              console.log("socket of line 145 " + socket.id);
              console.log(mdone);
              // const status = await User.updateOne({ "_id": verifyuser },
              //     { "$set": { "UserStatus": "online" } });
              const user = await User.findOne({"_id": verifyuser  });
          
              console.log(user);

  
              if(user.UserStatus=="online" ) {
                const dd =await User.updateOne(
                                    { "_id": verifyuser  },
                                    { "$set": { 'unsendmsg': [] } }
                                    );
                if(user.unsendmsg!=[]){
                  global.io.to(user.socketid).emit("newmessage",  user.unsendmsg , async function( error ,messag ) {
                  console.log('messag is', user.unsendmsg);
                 } );
                              console.log("dd");}

                callback(user.unsendmsg);
              }
              
          }
          
          console.log("last line 188 of socketcnn");
          console.log("mdone");
          // const mone = await User.findOne({ "_id": verifyuser });
          // console.log(mone.socketid);
      });
      ////socket 
        
      });
      server.listen(process.env.PORT || 8000 ,"192.168.31.202",() => {
        console.log(`server started at ${process.env.PORT} and the PID:-- ${process.pid}`);
      
         });
      ioApp.listen( 3000 ,"192.168.31.202",() => {
          console.log(`server started at 3000 socket`);
        })

    };


    // server.listen(process.env.PORT || 3000, process.env.Node_url ,() => {
    //     console.log(`server started at ${process.env.PORT}`);
    // })
  } catch (err) {
    console.log(err);
  }
}

try {
  st();
} catch (e) {
  console.log(e);
}

// module.exports = app;
