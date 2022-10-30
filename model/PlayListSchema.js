// const mongoose = require('mongoose');
// const jwt = require("jsonwebtoken");

// //making the user data representation
// const playlistschema = new mongoose.Schema({
//     playlistname: {
//         type: String,
//         required: true
//     },
//     playlist_id: {
//         type: String,
//         required: true
//     },
//     playlist_Creat_date: {
//         type: Date(),
//         required: true
//     },

//     Free:{
//         type: Boolean,
//         required: true
//     },
//     coursePlaylist:{
//         type: Boolean,
//         required: true
//     },
//     Assiociated_Course_Id:{
//         type: String,
//     },
//     Price:{
//         type: Number,
//         required: true
//         },
//     collab_playlist:{
//         type: Boolean, //multiuser playlist yes no
//         required: true
//     },
//     collab_users:[
//         {
//             creator_username:{
//                 type: String,
//             },
//             authority:{
//                 type: String, //admin can add delete but modarator only add
//             },
//             joindate:{
//                 type: Date(), //admin can add delete but modarator only add
//             },
//         }
//     ],
//     IsDuplicateFound:{
//         type: Boolean,
//         required: true
//     },
//     Duplicates:[{
//         Ducplicate_playlist_id:{
//             type: String,
//         }
//     }],
//     Copyright_Strick:{
//         type: Boolean,
//         required: true
        
//     },
//     Copyright_Claim:{
//         type: Boolean,
//         required: true
        
//     },
//     collab_add_Req:[{
//         username:{
//             type: String,
//         }, //user that want to be part send a add req
//         approved:{
//             type: String,
//         },

//     }],
//     collab_join_Req:[{
//         username:{
//             type: String,
//         }, //you send req to a user to join your playlist
//         approved:{
//             type: Boolean,
//         },

//     }],
//     Ban:{
//         type: Boolean,
//         required: true
        
//     },
//     no_views:{
//         type: Number,
//         required: true
//     },
//     Best_Search_terms:[{
//         term:{
//             type: String,

//         },
//         username:{
//             type: String,

//         },
//     }],
//     Fake:{
//         type: String,
//         required: true
//     },
//     cps:{
//         type: Number,
//         required: true
//     }, //click per suggestion
//     watch_time:{
//         type: Number,
//         required: true
//     },
//     no_Reports:{
//         type: Number,
//         required: true
//     },
//     Products_link:[{
//     P_Link:{
//         type: String,

//     },
//     P_Name:{
//         type: String,

//     },
//     P_Image_Link:{
//         type: String,

//     },
//     Rating_Prodcut:{
//         type: Number,

//     }
//     }],
    
//     Blog_post:{
//         type: String,
//     },
//     Algorithmpush:{
//         type: String,
//         required: true
//     },
//     playlist_size: {
//         type: String,
//     },
//     playlist_duration: {
//         type: String,
//     },
//     playlist_description:{
//         type: String,
//         required:true,
//     },

//     ip: {
//         type: String,
//         required:true
//     },
//     imei: {
//         type: String,
//         required:true,
//     },
//     phone_info: {
//         type: String,
//         required:true,
//     },
//     phone_version: {
//         type: String,
//         required:true,
//     },
    
//     playlist_fire:{
//         type: Number, //playlist like
//         required: true
//     },
    
//     playlist_cold:{
//         type: Number, //playlist dislike
//         required: true
//     },
//     tags:[{
//         tag:{
//             type: String,
//             required: true
//         }
//     }],
// })

// module.exports = Playlist = mongoose.model('playlist', playlistschema);