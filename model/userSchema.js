const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        md1token: {
            type: String,
            
        },
        md2token: {
            type: String
        },
        md3token: {
            type: String
        },
        md4token: {
            type: String
        },
    }],
    retokens: [{
        retoken: {
            type: String,
        },
        md1retoken: {
            type: String,
            
        },
        md2retoken: {
            type: String
            
        },
        md3retoken: {
            type: String
        },
        md4retoken: {
            type: String
        },
    }],
    UserStatus: {
        type: String,
    },
    UserRole: {
        type: String,
        required: true,
    },
    UserSearchHistory:[{
        usersearchterm: {
            type: String,
            required:true,
        },
        searchdatetime: {
            type: String,
            required:true,
        },
        clickvideos:[ {
            videoID: {
                type: String,
                required:true,
            },

        }],
        Searchstatus: {
            type: String,
            required:true,
        },
    }],
    UserVerified: {
        type: String,
    },
    socketid: {
        type: String,
        sparse: true,
        unique:true
    },
    unsendmsg: [
        {
            message: {
                type: String,
            },
            incomingsocketid: {
                type: String,
            },
             
        
        }
    ],
    uncompletesendread: [
        {
            socketidofcomplete: {
                type: String,
            },
            timeanddate: {
                type: String,
            },
        
        }
    ],
}, );

//creating token of jwt
userSchema.methods.generateAuthToken = async function () {
    try {
        console.log("enterrrrrrrrrrrrrrrrrrrrrrrr");
        const ttoken = await jwt.sign({ _id: this._id.toString() }, process.env.TOKEN_SECRET, {
            expiresIn: "5d"
        });

        const retoken = await jwt.sign({ _id: this._id.toString()}, process.env.R_TOKEN_SECRET, {
            expiresIn: "5d"
        });
        this.tokens = this.tokens.concat({ token: ttoken });
        this.retokens = this.retokens.concat({ retoken: retoken });
        // this.tokens.md1token = this.tokens.md1token.concat({ md1token: "null" });
        // this.retokens.md1retoken = this.retokens.md1retoken.concat({ md1retoken: "null" });
        await this.save();
        // console.log(this.tokens);
        console.log(ttoken);
        console.log(this._id);
        console.log("this idd from genetrate "+retoken);
        return [0,ttoken, retoken];
    
        //to veryfy and get the data from the token we just verify the token by prvide him the secrect key
        // const tokenverfication = await jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(tokenverfication);
    } catch (error) {
        console.log(error);
        // res.send("the error part of getauthtoken" + error);

    }
}

// now by passing the schema we create a db collect model
// const User = mongoose.model('USER', userSchema);
module.exports = User = mongoose.model('users', userSchema);