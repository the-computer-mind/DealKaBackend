const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const CommentModelSchema = new mongoose.Schema({
    Type:{
        type: String,
        required: true
    },
    CmmntID: {
        type: String,
        required: true
    },
    typeid:{
        type: String,
        required: true
    },

    comments: [{
        commentId: {
            type: String,
        },
        userName: {
        type: String,
        },
        comment: {
            type: String,
        },
        comment_like:[ 
            {
                cmt_like_userName: {
                type: String,
                },
            }
            ],
        comment_dislike: [ 
            {
                cmt_dislike_userName: {
                type: String,
                },
            }
            ],
        reply:[{
            replyId: {
                type: String,
            },
            r_userName: {
            type: String,
            },
            r_comment: {
                type: String,
            },
            r_comment_like: {
                type: Number,
            },
            r_comment_dislike: {
                type: Number,
            },
            r_cmt_Date_Time: {
                type: String,
            }
        }],
        cmt_Date_Time: {
            type: String,
        }
    
}],
})

module.exports = CommentModel = mongoose.model('Comment', CommentModelSchema);