const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const musicSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    Artist_Name: {
        type: String,
        required: true
    },
    Music_Type: {
        type: String,
        required: true
    },
    MusicId:{
        type: String,
        required: true,
        unique: true
        
    },
    Free:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
        },

    Music_upload_date: {
            type: String,
            required: true
        },
    IsDuplicateFound:{
        type: Boolean,
        required: true
    },
    Duplicates:[{
        Ducplicate_Ebook_id:{
            type: String,
        }
    }],
    Copyright_Strick:{
        type: Boolean,
        required: true
        
    },
    Copyright_Claim:{
        type: Boolean,
        required: true
        
    },
    Music_Remove_Req:[{
        Ebook_id:{
            type: String,
        },
        userobjectid:{
            type: String,
        },

    }],
    
    Approved:{
        type: Boolean,
        required: true
    },
    no_views:{
        type: Number,
        required: true
    },
    Best_Search_terms:[{
        term:{
            type: String,

        },
        username:{
            type: String,

        },
    }],
    Fake:{
        type: String,
        required: true
    },
    cps:{
        type: Number,
        required: true
    }, 
    no_Reports:{
        type: Number,
        required:true 
    },
    Algorithmpush:{
        type: String,
        required: true
    },
    music_name: {
        type: String,
        required:true,
    },
    music_size: {
        type: String,
        required:true,
    },
    music_description:{
        type: String,
        // required:true,
    },
    music_link:{
        type: String,
        required: true
    },
    music_thumbnail_link:{
        type: String,
        required: true
    },
    // comments: [{
    //         userobjectid: {
    //             type: String,
    //         },
    //         userName: {
    //         type: String,
    //         },
    //         comment: {
    //             type: String,
    //         },
    //         comment_like: {
    //             type: Number,
    //         },
    //         comment_dislike: {
    //             type: Number,
    //         },
    //         reply:[{
    //             r_userobjectid: {
    //                 type: String,
    //             },
    //             r_userName: {
    //             type: String,
    //             },
    //             r_comment: {
    //                 type: String,
    //             },
    //             r_comment_like: {
    //                 type: Number,
    //             },
    //             r_comment_dislike: {
    //                 type: Number,
    //             },
    //             r_cmt_Date_Time: {
    //                 type: String,
    //             }
    //         }],
    //         cmt_Date_Time: {
    //             type: String,
    //         }
        
    // }],
    
    music_like:{
        type: Number,
        required: true
    },
    
    music_dislike:{
        type: Number,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        required: true
    },
    Ban:{
        type: Boolean,
        required: true
    }
})

module.exports = Music = mongoose.model('musics', musicSchema);