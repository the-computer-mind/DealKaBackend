const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const OnlyproductSchema = new mongoose.Schema({
    ProductId: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    catagory: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        required:true,
    },
    discount:{
        type: String,
        required:true,
    },
    discountedprice: {
        type: String,
        required:true,
    },
    listing: {
        type: String,
        required:true,
    },
    ProductName: {
    type: String,
    required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductStock: {
        type: Number,
        required: true
    },
    ProductImageUrl: {
        type: Array,
        required: true
    },
    state: {
        type: String,
        required:true
    },
    noofrating: {
        type: String,
        required:true
    },
    rating: {
        type: String,
        required:true
    },
    Date_Time: {
        type: String,
        required: true
    },
    ProductLink: {
        type: String,
        required: true
    }
});

//making the user data representation
const CustomerSchema = new mongoose.Schema({
    product:[
        OnlyproductSchema
    ],
    Maxqnty_per_buyer: {
        type: String,
    },
    Customar_Review: {
        type: String,
    },
    Customar_Rating: {
        type: String,
    },
    Refund_Account_details:[{
        Account_number: {
            type: String,
        },
        Bank_Name: {
            type: String,
        },
        Ifsc_Code: {
            type: String,
        },
        Account_Holder_Name: {
            type: String,
        }, 
        Amount: {
            type: String,
        },
        Upi: {
            type: String,
        },
        Refund_initiat_date: {
            type: String,
        },
        refund_complete_date: {
            type: String,
        },
        user_not_recive: {
            type: Boolean,
        },
        raised_query:{
            type: String
        },
        query_video_link: {
            type:String
        }
    }],
    Seen_Details: [{
        Buyer_Seen: {
            type: String,
        },
        Buyer_Seen_Date: {
            type: String,
        },
        Seller_Seen: {
            type: String,
        },
        Seller_Seen_Date: {
            type: String,
        },
        Payoco_Seen: {
            type: String,
        },
        Payoco_Seen_Date: {
            type: String,
        },
    }],
    orderid: {
        type: String,
        required: true
    },
    uniqueid: {
        type: String,
        required: true,
        unique: true
    },
    seller_name: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    Customername: {
        type: String,
        required:true,
    },
    Quantity: {
        type: String,
        required:true,
    },
    availabilitycheck: [
        {
            buyerask: {
                type: String,
            },
            sellerresponse: {
                type: String,
            },
        }
    ],
    paydetails: [{
        paydate: {
            type: String,
        },
        payamount: {
            type: String,
        },
        transaction_id: {
            type: String,
        },
        payment_id: {
            type: String,
        },
        
    }],
    ispaid: {
        type: Boolean,
    },
    isproductshipped: {
        type: Boolean,
    },
    shippmemt_details: [{
        shipping_id: {
            type: String,
        },
        shipping_link: {
            type: String,
        },
        shipping_date: {
            type: String,
        },
    }],

    isproduct_dispatch:{
        type: String,
    },
    is_shipment_details_true: {
        type: String,
    },
    delivered_details: [{
        confirm_by_seller: {
            type: String,
        },
        confirm_by_buyer: {
            type: String,
        },
        delivered_date: {
            type: String,
        },
    }],
    adderess_details: [{
        buyer_adderess: {
            type: String,
        },
        confirm_by_seller: {
            type: Boolean,
        },
    }],

    isproductok: {
        type: String,
    },
    transaction_closed: {
        type: Boolean,
    },
    iscustomersatisfied: {
        type: String,
    },

    isRefundQuaery_raised: {
        type: Boolean,
    },
    raised_refund_quaery: [{
        paidby_buyer: {
            type: Boolean,
        },
        paidamount: {
            type: String,
        },
        refund_transaction_id: {
            type: String,
        },
        paiddate: {
            type: String,
        },
        query_text: {
            type: String,
        },
        query_video_link: {
            type: String,
        },
        query_photos_link: {
            type: Array,
        },
        refund_payment_id: {
            type: String,
        },
    }],
    refundquery_seller_response:[{
        query_text: {
            type: String,
        },
        query_video_link: {
            type: String,
        },
        query_photos_link: {
            type: Array,
        },
        query_date: {
            type: String,
        },
    }],
    second_raised_refund_quaery: [{

        buyer_response:[{
            query_text: {
                type: String,
            },
            query_video_link: {
                type: String,
            },
            query_photos_link: {
                type: Array,
            },
            query_date: {
                type: String,
            },
        }],

        seller_response:[{
            query_text: {
                type: String,
            },
            query_video_link: {
                type: String,
            },
            query_photos_link: {
                type: Array,
            },
            query_date: {
                type: String,
            },
        }],
        Payoco_response:[{
            payoco_moderator_name: {
                type: String,
            },

            query_text: {
                type: String,
            },
            query_video_link: {
                type: String,
            },
            query_photos_link: {
                type: Array,
            },
            query_date: {
                type: String,
            },
        }],
    }],
    not_recived_query: [{

        buyer_query:[{
            query_text: {
                type: String,
            },
            query_photos_link: {
                type: Array,
            },
            query_date: {
                type: String,
            },
        }],

        seller_query:[{
            query_text: {
                type: String,
            },
            query_photos_link: {
                type: Array,
            },
            query_date: {
                type: String,
            },
        }],
    }],
    final_refund_query_result:[{
        payoco_moderator_name: {
            type: String,
        },
        result_query_text: {
            type: String,
        },

        result_query_video_link: {
            type: String,
        },
        query_photos_link: {
            type: Array,
        },
        result_query_date: {
            type: String,
        },
    }],
    isMoney_refunded: {
        type: Boolean,
    },
    isrefund_rejected: {
        type: Boolean,
    },
    iscustomerscammer: {
        type: String,
    },
    issellerscammer: {
        type: String,
    },
    isPayaco_Moderator_Assign:{
        type: Boolean,
    },
    requested_to_recheck_Query:{
        type: String,
    },
    Hack_Smell:{
        type: String,
    },
    Hold:{
        type:Boolean,
    },
    Current_Assign_Moderator_name:{
        type:String,
    },
    Assign_Moderator:[{
        Moderator_Name: {
            type: String,
        },
        Assign_date: {
            type: String,
        },
        Refund_Accepted: {
            type: String,
        },
        Result_Date: {
            type: String,
        },
    }],

    final_refund_details:[{
        refund_initiated: {
            type: Boolean,
        },
        refund_date: {
            type: String,
        },
        refund_id: {
            type: String,
        },
        refund_bank_account_upi: {
            type: String,
        },
    }],
})

module.exports = Customersdetails = mongoose.model('customersdetails', CustomerSchema);