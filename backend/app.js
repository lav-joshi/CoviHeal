const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const donorRoutes = require("./routes/donor");
const nodemailer=require("nodemailer");
const patientRoutes = require("./routes/patient");
const {OAuth2Client} = require("google-auth-library");
const app = express();
require("./db/mongoose");

const transporter = nodemailer.createTransport({
    service:'gmail', 
    auth:{
        user:'eduon.portal@gmail.com',
        pass:'lav1234@'
    }   
});

const Donor= require("./models/Donor");
const Patient = require("./models/Patient");
const Recommend = require("./models/Recommend");

const User = require("./models/User");

const client = new OAuth2Client(keys.clientId);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/donor", donorRoutes);
app.use("/patient",patientRoutes);


app.post("/google/signin",async(req,res)=>{
  
    const {tokenId} = req.body;
   
    client.verifyIdToken({
        idToken : tokenId  ,
        audience : keys.clientId
    }).then((response)=>{
        const {email_verified , name, email } = response.payload;
        if(email_verified){
            User.findOne({email},(err,user)=>{
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        error: "Something went wrong"
                    })
                }else{
                    if(user){
                        const token = jwt.sign({_id: user._id} , keys.jwtSecret ,{expiresIn :'7d'});
                        
                        const {_id , name , email } =  user;
                        res.json({
                            token ,
                            user : {_id , name , email }
                        })
                    }else{
                        let newUser = new User({name , email });
                        const token = jwt.sign({_id: newUser._id} , keys.jwtSecret ,{expiresIn :'7d'});
                        
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    error: "Something went wrong"
                                })
                            }else{
                                const {_id , name , email } =  newUser;
                                res.json({
                                    token,
                                    user : {_id , name , email }
                                })
                            }
                        })
                    }
                }
            });
        }
    })
});


app.post("/recommend", (req,res)=>{

    const temp = {
        name : req.body.name , 
        email : req.body.email , 
        recommendor : req.body.recommendor
    }
    
    var mailOptions ={
        from:'eduon.portal@gmail.com',
        to:req.body.email,
        subject:"You are invited to donate plasma by " + req.body.recommendor,
        html:` Greetings ${req.body.name},<br/><br/>
        A warm welcome to you from us at <b>CoviHeal</b>, we hope that this mail finds you well.<b>
        ${req.body.recommendor}</b> has told us about how you have recently recovered from COVID19.
        Did you know that the blood plasma from a recovered person can help someone to recover from covid.
        We are a two-way solution connecting the donor and patients while maintaining full privacy for both.<br/>
        <b>
        We request you to visit covihelp.com and help others!</b>
        <br/><br/>
        Regards,<br/>
        Team CoviHelp`  
    };

    Recommend.create(temp , (err , recommend)=>{
        transporter.sendMail(mailOptions , async (err, info)=>{
            if(err) console.log(err);
            else console.log("Email Sent");
        });

        if(err){
            res.status(400).send("Something went wrong");
        }else{
            res.status(200).send("Thanks for  recommending");
        }
    });
});



app.post("/notify", (req,res)=>{
     console.log(req.body.email);
    var mailOptions ={
        from:'eduon.portal@gmail.com',
        to:req.body.email,
        subject:"Someone is requesting you to donate plasma .",
        html:` Greetings <br/><br/>
        A warm welcome to you from us at <b>CoviHeal</b>, we hope that this mail finds you well.
        We request you to visit covihelp.com and help the needy person ! 
        <br/><br/>
        Regards,<br/>
        Team CoviHelp`  
    };

    transporter.sendMail(mailOptions , async (err, info)=>{
        if(err){
            res.status(400).send("Something went wrong");
        }else{
            res.status(200).send("Person Notified");
        }    
    });
  
});


app.post("/getprofile",(req,res)=>{

    Patient.findOne({email : req.body.email},(err,patient)=>{

        if(err){
            res.status(400).json({
                message : "Something went wrong"
            });
        }else if(!patient){
            Donor.findOne({email : req.body.email},(err, donor)=>{
                if(err){
                    res.status(400).json({
                        message : "Something went wrong"
                    });
                }else{
                    res.status(200).json({
                        donor , 
                        isPatient : false
                    })
                }
            })
        }else{
            res.status(200).json({
                patient ,
                isPatient : true
            })
        }
    });

});

app.listen(process.env.PORT || 5000,(req,res)=>{
   console.log("server started ");
});
