const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//connecting mongodb with backend using app code
// this only one time need in app.js dotenv.config({path: './config.env'});
const DB = process.env.DATABASE;

//connecting thedb now here then matlab agar connect success
              // huya to kya and catch matlab error aaya to kya
mongoose.connect(DB,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
                console.log(`connection successful`);
            }).catch((err) => {
                console.log(`Not Connect ${err}`);
            }); //then and catch is like promises in dart we use try and catch