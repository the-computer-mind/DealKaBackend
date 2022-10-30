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

//Node_url
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
const User = require('./model/userSchema');
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

function st() {
  app.use(cors());

  try {
    app.use(express.json());

    //connecting mongodb with backend using app code
    dotenv.config({ path: "./config.env" });
    require("./db/conn");
    //using middleware we execute this from auth to here require function is like next()
    app.use(require("./router/auth"));
    app.use(require("./router/verifyotp"));
    
    app.use(require("./router/login"));
    console.log("lopppppppppppppppppp");
    app.use(require("./router/logout"));
    app.use(require("./router/refreshtoken"));
    console.log("111111111");
   
    app.use(require('./router/getallvideos'));
    app.use(require("./router/productadd"));
    app.use(require("./router/userallproducts"));
    app.use(require("./router/productupdate"));
    app.use(require("./router/deleteproduct"));
    app.use(require("./router/getallproducts"));
    app.use(require('./router/getallebooks'));
    app.use(require('./router/getallmusics'));
    app.use(require('./router/getsuggestedvideo'));
    app.use(require('./router/getshortvideos'));
    app.use(require('./router/getallblogs'));
    app.use(require('./router/getallplaces'));
    app.use(require('./router/getallevents'));
    app.use(require('./router/getallcourses'));
    app.use(require('./router/myallvideos'));
    app.use(require('./router/deletecourse'));
    app.use(require('./router/updatechanneldescription'));
    app.use(require("./router/uploadvideolink"));
    app.use(require("./router/uploadmusic"));
    app.use(require("./router/uploadebooklink"));
    app.use(require("./router/upload_course_link"));
    app.use(require("./router/uploadplace"));
    app.use(require("./router/upload_Blog"));
    app.use(require("./router/uploadevent"));
    app.use(require("./router/deletevideo"));
    app.use(require("./router/editvideo"));
    app.use(require("./router/viewupdate"));
    app.use(require("./router/likeupdate"));
    app.use(require("./router/userroleender"));
    app.use(require("./router/getadminallvideos"));
    app.use(require("./router/approved_video"));
    app.use(require("./router/approve_course"));
    app.use(require("./router/commentupdate"));
    app.use(require("./router/reply_update"));
    app.use(require("./router/cmt_likeupdate"));
    app.use(require("./router/editmyblog"));
    app.use(require("./router/loginbygoogleapi"));
    app.use(require("./router/generate_order_id"));
    app.use(require("./router/getcomments"));
    app.use(require("./router/editcourselink"));
    app.use(require("./router/BuyCourse"));
    app.use(require("./router/Singupstorebygoogleapi"));
    app.use(require("./router/uploadLiveEvent"));
    app.use(require("./router/getallliveevents"));
    app.use(require("./router/add_photo_to_place"));
    app.use(require("./router/deleteblog"));
    app.use(require("./router/addnewbanners"));
    app.use(require("./router/getallbanners"));
    app.use(require("./router/uploadnewappversion"));
    app.use(require("./router/gettAppVersion"));
    app.use(require("./router/login_load_test"));
    app.use(require("./router/deleteevent"));
    app.use(require("./router/deleteliveevent"));
    app.use(require("./router/addnewmusiccatagory"));
    app.use(require("./router/getcoursereview"));
    app.use(require("./router/submitCourseReview"));
    app.use(require("./router/buyfreecourses"));
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
  var ns;
  // const redisClient = redis.createClient();
  // const redisGetAsync = promisify(redisClient.get).bind(redisClient);
  // var redisClient = redis.createClient('192.168.0.104', 6379);
  
              
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
      core=numCpu/2;
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
      server.listen(process.env.PORT || 3000, process.env.Node_url ,() => {
        console.log(`server started at ${process.env.PORT} and the PID:-- ${process.pid}`);
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
