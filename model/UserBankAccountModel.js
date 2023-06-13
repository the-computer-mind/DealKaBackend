const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//making the user data representation
const UserBankAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    ListOfUserBAnkAccount:[{
        UserName: {
            type: String,
        },
        WithdrawalType: {
            type: String,
        },
        
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
        Upi: {
            type: String,
        },
        DateOfAdding: {
            type: String,
        },
        Account_verified: {
            type: Boolean,
        },
        Status: {
            type: String,
        },
        Kyc: {
            type: String,
        },
        BankCountry: {
            type: String,
        },
        others: {
            type: String,
        },
    }],
    


}, );


module.exports = Userbankaccount = mongoose.model('userbankaccount', UserBankAccountSchema);