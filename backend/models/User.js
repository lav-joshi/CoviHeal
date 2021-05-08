const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
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
    imageURL:{
        type: String,
    },
    created:  {type:Date,default:Date.now}
});

module.exports = mongoose.model("users", UserSchema);