const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const Patient = require("../models/Patient");
const {cloudinary} = require("../utils/cloudinary");


router.post("/register",async (req,res)=>{
   
    const x = JSON.parse(req.body.data);
    const fileStr = x.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ml_default',
    });
     
    
    const temp = {
        age : req.body.age,
        bloodGroup : req.body.bloodGroup,
        email:req.body.email,
        name:req.body.name,
        phoneNumber : req.body.phoneNumber , 
        recoveryDate : req.body.recoveryDate,
        areaName : req.body.areaName,
        district : req.body.district,
        pincode : req.body.pincode,
        state : req.body.state,
        imageURL : uploadResponse.secure_url
    }

   Donor.create(temp, async (err,donor)=>{
        if(err){
            console.log(err);
            res.status(400).json({
                message : "Something went wrong"
            });
        }else{
            res.status(200).json({
               message : "Created successfully" 
            });
        }
   });
});

router.get("/getprofile",(req,res)=>{
    User.findOne({_id:req._id},(err,user)=>{
        Donor.findOne({email : user.email},(err,donor)=>{
            if(err){
                res.status(400).json({
                    message : "Something went wrong"
                });
            }else{
                res.status(200).send(donor);
            }
       });
    });
});


router.get("/findalldonors" , (req,res)=>{
    console.log("chudo");
   Donor.find({},(err,donors)=>{
      if(err){
        res.status(400).json({
            message : "Something went wrong"
        });
      }else{
        console.log(donors);
        res.status(200).send(donors);
      }
   });
});



module.exports = router;