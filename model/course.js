const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const courseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    location_uv: [
    {
        longitude: { //location while up means uploading video
        type: Number,
        required: true
        },
        latitude: { //location while up means uploading video
        type: Number,
        required: true
        },
        adderess: { //location while up means uploading video
            type: String,
            required: true
            },
    }
    ],
    CourseId:{
        type: String,
        required: true,
        unique: true
        
    },
    Enrollusers:[{
        username:{
            type: String,
            required: true,
            //unique: true
        },
        buydate:{
            type: String,
            required: true,
        },
        review:{
            type: String,
            required: true,
        },
        rating:{
            type: String,
            required: true,
        },
    }],
    Free:{
        type: String,
        required: true
    },
    unfinished:{
        type: Boolean,
        required: true
    },
    courselanguage:{
        type: String,
        required: true
    },
    downloadsource:{
        type: String,
        required: true
    },
    courseRating:{
        type: Number,
        required: true
    },
    courseebook:{
        type: String,
        required: true
    },
    
    Price:{
        type: Number,
        required: true
        },

    Course_upload_date: {
            type: String,
            required: true
        },
    IsDuplicateFound:{
        type: Boolean,
        required: true
    },
    Course_Duplicates:[{
        Ducplicate_Video_id:{
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
    Course_Remove_Req:[{
        Video_id:{
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
    Course_Best_Search_terms:[{
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
    }, //click per suggestion
    watch_time:{
        type: Number,
        required: true
    },
    no_Reports:{
        type: Number,
        required: true
    },
    i_cards:[{Link:{
        type: String,
    },
    Name:{
        type: String,
    },
    duration:{
        type: Number,
    }
}],
    duration:{
        type: Number,
        required: true
    },

    Products_link:[{
        type:{
            type: String,
    
        },
        ProductName:{
            type: String,
    
        },
        ProductDescription:{
            type: String,
    
        },
        ProductPrice:{
            type: Number,
    
        },
        ProductStock:{
            type: Number,
    
        },
        ProductImageUrl:[
    
        ],
        state:{
            type: String,
    
        },
        noofrating:{
            type: String,
    
        },
        rating:{
            type: String,
    
        },
        Date_Time:{
            type: String,
    
        },
        ProductLink: {
            type: String,
        }
        
        
        }],
    
    Blog_post:{
        type: String,
    },
    Algorithmpush:{
        type: String,
        required: true
    },
    Course_name: {
        type: String,
        required:true,
    },
    Course_size: {
        type: String,
        required:true,
    },
    Course_description:{
        type: String,
        // required:true,
    },
    thumbnail_link:{
        type: String,
        required: true
    },
    Course_Section_List:[{
        section_no:{
            type:Number,
            required:true
        },
        Section_title: {
            type: String,
            required:true
        },
        section_Description: {
            type: String,
            
        },
        section_tutorial_no:{
            type:Number,
            required:true
        },
        blog_id: {
            type: String,
            
        },
        section_Duration:{
            type:Number,
            required:true
        },
        downloadsectionsource:{
            type: String,
            required: true
        },
        videodetails:[
            {
                username: {
                    type: String,
                    required: true
                },
                location_uv: [
                {
                    longitude: { //location while up means uploading video
                    type: Number,
                    required: true
                    },
                    latitude: { //location while up means uploading video
                    type: Number,
                    required: true
                    },
                    adderess: { //location while up means uploading video
                        type: String,
                        required: true
                        },
                }
                ],
                VideoId:{
                    type: String,
                    required: true,
                    // unique: true
                    
                },
                Free:{
                    type: String,
                    required: true
                },
                coursevideo:{
                    type: Boolean,
                    required: true
                },
                courseid:{
                    type: String,
                },
                video_no_of_section:{
                    type: Number,
                },
                course_section_no:{
                    type:Number
                },
                shortvideo:{
                    type: Boolean,
                    required: true
                },
                unfinished:{
                    type: Boolean,
                    required: true
                },
                InCourse:[{
                    CourseLink:{
                        type: String,
                    },
                }],
                Price:{
                    type: Number,
                    required: true
                    },
            
                Video_upload_date: {
                        type: String,
                        required: true
                    },
                IsDuplicateFound:{
                    type: Boolean,
                    required: true
                },
                Duplicates:[{
                    Ducplicate_Video_id:{
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
                Video_Remove_Req:[{
                    Video_id:{
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
                }, //click per suggestion
                watch_time:{
                    type: Number,
                    required: true
                },
                no_Reports:{
                    type: Number,
                    required: true
                },
                i_cards:[{Link:{
                    type: String,
                },
                Name:{
                    type: String,
                },
                duration:{
                    type: Number,
                }
            }],
                duration:{
                    type: Number,
                    required: true
                },
            
                Products_link:[{
                    type:{
                        type: String,
                
                    },
                    ProductName:{
                        type: String,
                
                    },
                    ProductDescription:{
                        type: String,
                
                    },
                    ProductPrice:{
                        type: Number,
                
                    },
                    ProductStock:{
                        type: Number,
                
                    },
                    ProductImageUrl:[
                
                    ],
                    state:{
                        type: String,
                
                    },
                    noofrating:{
                        type: String,
                
                    },
                    rating:{
                        type: String,
                
                    },
                    Date_Time:{
                        type: String,
                
                    },
                    ProductLink: {
                        type: String,
                    }
                    
                    
                    }],
                
    Blog_post:[{
        username: {
            type: String,
            required: true
        },
        location_uv: [
        {
            longitude: { //location while up means uploading video
            type: Number,
            required: true
            },
            latitude: { //location while up means uploading video
            type: Number,
            required: true
            },
            adderess: { //location while up means uploading video
                type: String,
                required: true
                },
        }
        ],
        BlogId:{
            type: String,
            required: true,
            
        },
        BlogData:{
            type: String,
            required: true,
            
        },
        Free:{
            type: String,
            required: true
        },
        CourseBlog:{
            type: Boolean,
            required: true
        },
        unfinished:{
            type: Boolean,
            required: true
        },
        Price:{
            type: Number,
            required: true
            },
    
        Blog_upload_date: {
                type: String,
                required: true
            },
        IsDuplicateFound:{
            type: Boolean,
            required: true
        },
        Blog_Duplicates:[{
            Ducplicate_Video_id:{
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
        Blog_Remove_Req:[{
            Video_id:{
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
        Blog_Best_Search_terms:[{
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
        }, //click per suggestion
        clickonVideo:{
            type: Number,
            required: true
        },
        no_Reports:{
            type: Number,
            required: true
        },
        Algorithmpush:{
            type: String,
            required: true
        },
        Blog_name: {
            type: String,
            required:true,
        },
        Blog_size: {
            type: String,
            required:true,
        },
        Blog_description:{
            type: String,
            // required:true,
        },
        Blog_link:{
            type: String,
            // required:true,
        },
        thumbnail_link:{
            type: String,
            required: true
        },
    
        ip: {
            type: String,
            required:true
        },
        imei: {
            type: String,
            required:true,
        },
        phone_info: {
            type: String,
            required:true,
        },
        phone_version: {
            type: String,
            required:true,
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
        
        Blog_like:{
            type: Number,
            required: true
        },
        
        Blog_dislike:{
            type: Number,
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
    }],
                Algorithmpush:{
                    type: String,
                    required: true
                },
                video_name_inphone:{
                    type: String,
                    required:true,
                },
                video_name: {
                    type: String,
                    required:true,
                },
                video_size: {
                    type: String,
                    required:true,
                },
                Video_description:{
                    type: String,
                    // required:true,
                },
                video_link:{
                    type: String,
                    required: true
                },
                thumbnail_link:{
                    type: String,
                    required: true
                },
                Video_playlist:[{
                    playlistname: {
                        type: String,
                    },
                    playlist_id: {
                        type: String,
                    },
                }],
            
                ip: {
                    type: String,
                    required:true
                },
                imei: {
                    type: String,
                    required:true,
                },
                phone_info: {
                    type: String,
                    required:true,
                },
                phone_version: {
                    type: String,
                    required:true,
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
                
                video_like:{
                    type: Number,
                    required: true
                },
                
                video_dislike:{
                    type: Number,
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
            }
        ]
    }],

    ip: {
        type: String,
        required:true
    },
    imei: {
        type: String,
        required:true,
    },
    phone_info: {
        type: String,
        required:true,
    },
    phone_version: {
        type: String,
        required:true,
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
    
    Course_like:{
        type: Number,
        required: true
    },
    
    Course_dislike:{
        type: Number,
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

module.exports = Course = mongoose.model('courses', courseSchema);