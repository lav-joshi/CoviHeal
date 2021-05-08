const mongoose = require("mongoose");

var RecommendSchema=new mongoose.Schema({
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
    created:  {type:Date,default:Date.now}
});

module.exports = mongoose.model("recommend", RecommendSchema);