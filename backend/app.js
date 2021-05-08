const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const donorRoutes = require("./routes/donor");
const patientRoutes = require("./routes/patient");
const {OAuth2Client} = require("google-auth-library");

const app = express();
require("./db/mongoose");

const Donor= require("./models/Donor");
const Patient = require("./models/Patient");
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

app.listen(process.env.PORT || 5000,(req,res)=>{
   console.log("server started ");
});
