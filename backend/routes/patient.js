const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const Patient = require("../models/Patient");
const {cloudinary} = require("../utils/cloudinary");
const { route } = require("./donor");


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
    
   Patient.create(temp, async (err,patient)=>{
        if(err){
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
        Patient.findOne({email : user.email},(err,patient)=>{
            if(err){
                res.status(400).json({
                    message : "Something went wrong"
                });
            }else{
                res.status(200).send(patient);
            }
       });
    })
});


router.post("/addfav",async(req,res)=>{
    
    Patient.findOne({email : req.body.patientemail } , async(err,patient)=>{
        if(err){
            res.status(400).json({
                message : "You are not registered as patient"
            });
            return;
        }
        Donor.findOne({email : req.body.donoremail }, async(err,donor)=>{
            if(err){
                res.status(400).json({
                    message : "Something went wrong"
                });
            }else{
                  let ind = patient.favs.indexOf(req.body.donoremail);
                  if(ind!=-1){
                    res.status(200).send({message : "Already in your contact list"});
                    return;
                  }

                  patient.favs.push(req.body.donoremail);
                  await patient.save();
                  donor.favs.push(req.body.patientemail);
                  await donor.save();
                  res.status(200).send({message : "Added in our contact list"});
              }
        })
    });
});


router.post("/getfavs", async (req,res)=>{

    Patient.find({},(err , patients)=>{
    Donor.find({},(err , donor)=>{
        Patient.findOne({email : req.body.email},async (err,patient)=>{
            if(err){
             res.status(400).json({
                 message : "Something went wrong"
             });
            }else if(!patient){
                
                Donor.findOne({email :  req.body.email},(err , drr)=>{
                    if(err){
                        res.status(400).json({
                            message : "Something went wrong"
                        });
                    }else{
                        let arr = [];
                        drr.favs.forEach((x)=>{
                            patients.forEach((y)=>{
                               if(y.email ==x){
                                arr.push({
                                    donor_email : x,
                                    donor_name : y.name
                                })
                               }
                            })
                        })
                        res.status(200).send(arr);
                    }
                })
            }else{
              let arr = [];
     
              patient.favs.forEach((x)=>{
                    donor.forEach((y)=>{
                        if(y.email === x){
                            arr.push({
                                donor_email : x,
                                donor_name : y.name
                            })
                        }
                    })
              });
              res.status(200).send(arr);     
            }
         });
    })
})
})

module.exports = router;
