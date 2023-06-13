const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const WalletSchema = new mongoose.Schema({
    WalletId: {
        type: String,
        required: true
    },
    Refercode: {
        type: String,
        required: true,
        unique: true,

    },
    referBy: {
        type: String,
    },
    referTime: {
        type: String,
    },
    TotalNumberOfRefer: {
        type: String,
    },
    ReferTo: [
        {
            ReferName: {
                type: String,
            },
            ReferTime: {
                type: String,
            },
            ReferScam: {
                type: String,
            },
            RewardDeliver: {
                type: String,
            },
        
        }
    ],
    ReferScamBy: {
        type: String,
    },
    ReferScamto: {
        type: String,
    },
    EarnPoints: [
        {
            PointAmount: {
                type: String,
            },
            PointTime: {
                type: String,
            },
            Forwhat: {
                type: String,
            },
            PointStatus: {
                type: String,
            },
            PointDeliver: {
                type: String,
            },
        
        }
    ],
    RedeemPoints: [
        {
            PointAmounts: {
                type: String,
            },
            PointsTime: {
                type: String,
            },
            RedeemTo: {
                type: String,
            },
            RedeemStatus: {
                type: String,
            },
            RedeemDeliver: {
                type: String,
            },
        
        }
    ],
    CurrentWalletBalance: {
        type: String,
    },
    WalletBalanceHistory: [
        {
            AddMoneyorCashBackorDebit: {
                type: String,
            },
            BAlanceTime: {
                type: String,
            },
            AddedFromorcbfrom: {
                type: String,
            },
            ScamWatcher: {
                type: String,
            },
            StatusofBalance: {
                type: String,
            },
            DebitRewardStatus: {
                type: String,
            },
        
        }
    ],
    WalletBalanceHold: {
        type: String,
    },
    PointHold: {
        type: String,
    },
    AffiliateJoin: {
        type: String,
    },
    AffiliateJoinDate: {
        type: String,
    },
    AffiliateInfo: [
        {
            ShareDate: {
                type: String,
            },
            Sharelink: {
                type: String,
            },
            ShareProductId: {
                type: String,
            },
            ProductStatus: {
                type: String,
            },
            noofsale: {
                type: String,
            },
            RewardStatus: {
                type: String,
            },
            LinkStatus: {
                type: String,
            },
            Scamdetected: {
                type: String,
            },
        
        }
    ],
    SellerAspartner: {
        type: String,
    },
    SellerGivePercentage: {
        type: String,
    },
    SellerPromotion: {
        type: String,
    },

    


})

module.exports = Wallet = mongoose.model('wallets', WalletSchema);