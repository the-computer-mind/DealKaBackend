const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');



const jwtauth = async function () {
    

    try {
        console.log("jwt auth line 11   " +process.env.DeviceId );
        const verifyUser = jwt.verify(process.env.jwt_token, process.env.TOKEN_SECRET);
        tokenname = "";
        const ioo = await User.findOne({ "_id": verifyUser });
        console.log("ioooooooooooooooo");
        if (ioo == null) {
            console.log("lppppppppppppppppppppppppp line 18 of jwt auth");
            return 2;
        }
        

        console.log(process.env.DeviceId+"       under jwt auth" + process.env.jwt_token);
        const user = await User.findOne({ _id: verifyUser } );
        // console.log(user + "juytre");
        var doe;
        if (process.env.DeviceId == 0) {
             doe = user.tokens[0].token;
        }else if (process.env.DeviceId == 1) {
             doe = user.tokens[0].md1token;
        } else if (process.env.DeviceId == 2) {
             doe = user.tokens[0].md2token;
        } else if (process.env.DeviceId == 3) {

            console.log("loggggggggggggggggggggggggggggg");
             doe = user.tokens[0].md3token;
        }else if (process.env.DeviceId == 4) {
             doe = user.tokens[0].md4token;
        }
        // const user = await User.findOne( {"$retokens.retoken":process.env.jwt_retoken} );
        // console.log(user + "juytre");
        // const doe = user.retokens[0]["retoken"]
        // tok = { "process.env.jwt_retoken"}
        console.log( "kioolll  " );
        console.log("                ooopp        " );
        if (process.env.jwt_token != doe) {
            console.log("match");
            return 2;
        };
        
        console.log(verifyUser);
        // const user = await User.findOne({ _id: verifyUser._id })
        console.log("user.name");
        return true;


    } catch (error) {
        console.log(error);
        if (error instanceof jwt.TokenExpiredError) {
            try {
            console.log("entering to refresh token of jwtauth");
            // console.log(process.env.jwt_retoken+"now seee original"+doe); 
            const reverifyUser = jwt.verify(process.env.jwt_retoken, process.env.R_TOKEN_SECRET);
            
            const user = await User.findOne({ _id: reverifyUser } );
        // console.log(user + "juytre");
            var doe;
            if (process.env.DeviceId == 0) {
                doe = user.retokens[0].retoken;
            }else if (process.env.DeviceId == 1) {
                doe = user.retokens[0].md1retoken;
            } else if (process.env.DeviceId == 2) {
                doe = user.retokens[0].md2retoken;
            } else if (process.env.DeviceId == 3) {

                console.log("loggggggggggggggggggggggggggggg");
                doe = user.retokens[0].md3retoken;
            }else if (process.env.DeviceId == 4) {
                doe = user.retokens[0].md4retoken;
            }
            // const user = await User.findOne( {"$retokens.retoken":process.env.jwt_retoken} );
            // console.log(user + "juytre");
            // const doe = user.retokens[0]["retoken"]
            // tok = { "process.env.jwt_retoken"}
            console.log( "kioolll  " );
            console.log("                ooopp        " );
            if (process.env.jwt_retoken != doe) {
                console.log("match");
                return 2;
            };
                
            // const uuser = await User.findOne({ _id: reverifyUser._id })
            // const alltoken = await uuser.generateAuthToken();
            // const token = alltoken[0];
            // const retoken = alltoken[1];
            // console.log("cholooo end");
            // process.env.jwt_token = token;
            // process.env.jwt_retoken = retoken;
            return false;
                
            } catch (err) {
                console.log("refresh also expired");
                console.log(err);
                try {if (err instanceof jwt.TokenExpiredError) {
                    console.log("ookkk return two from jwt auth last if");
                    return 2;
                }
                } catch (err) {
                    console.log(err+process.env.jwt_retoken);
                }
                

            }
            
        }
        // return res.sendStatus(401).send({ message: "Unauthorized!" });
    }
}

module.exports = jwtauth;