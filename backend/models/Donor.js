const mongoose = require("mongoose");

var DonorSchema=new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required : true
    },
    name:{
        type: String,
        trim: true,
        required : true
    },
    bloodGroup : {
        type: String ,
        trim : true,
        required : true,
    },
    age : {
        type: Number ,
        trim : true,
        required : true,
    },
    phoneNumber : {
        type: Number ,
        trim : true,
        required : true,
    },
    imageURL:{
        type: String,
        required : true
    },
    recoveryDate :{
        type: Date , 
        require : true
    },
    isVerified:{
        type : Boolean,
        default : false,
    },
    areaName :{
        type: String,
        required : true
    },
    district :{
        type: String,
        required : true
    },
    pincode:{
        type: String,
        required : true
    },
    state:{
        type: String,
        required : true
    },
    favs : [String],
    created:  {type:Date,default:Date.now}
});

module.exports = mongoose.model("donor", DonorSchema);