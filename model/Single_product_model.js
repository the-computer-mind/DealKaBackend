const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const singleproductSchema = new mongoose.Schema({
    userobjectid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true,
    },
    ProductId: {
        type: String,
        required:true,
        unique:true,
    },
    type: {
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
    },
    Customers:[
        {
            Customername: {
                type: String,
                unique:true,
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
                type: Boolean,
            },
            delivered_details: [{
                confirm_by_seller: {
                    type: Boolean,
                },
                confirm_by_buyer: {
                    type: Boolean,
                },
                delivered_date: {
                    type: String,
                },
            }],

            isproductok: {
                type: Boolean,
            },
            transaction_closed: {
                type: Boolean,
            },
            iscustomersatisfied: {
                type: Boolean,
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
                paiddate: {
                    type: String,
                },
                query_text: {
                    type: String,
                },
                query_video_link: {
                    type: String,
                },
                query_date: {
                    type: String,
                },
            }],
            refundquery_buyer_response:[{
                query_text: {
                    type: String,
                },
                query_video_link: {
                    type: String,
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
                    query_date: {
                        type: String,
                    },
                }],
            }],
            final_refund_query_result:[{
                result_query_text: {
                    type: String,
                },
                result_query_video_link: {
                    type: String,
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
                type: Boolean,
            },
            issellerscammer: {
                type: Boolean,
            },
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






        }
    ]
})

module.exports = SingleProduct = mongoose.model('singleproducts', singleproductSchema);