const User=require('../Model/user');
const jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const { check, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs');
// user signup 
module.exports.signup =  (req, res) => {
  const user = req.body;
  if(!user){
    return res.status(400).json({error:"USER CANNOT BE REGISTERED"});
  }
 
  const saveuser=new User(req.body);

  saveuser.save((err,saveuser)=>{
    if(err){
      return res.status(400).json({error:"USER CANOT BE REGISTERED"})
    }
    return res.status(201).json({message:"User Registered"});
  })
};
//signin
module.exports.signin = (req, res)=>{
  const {userId,encry_password}=req.body;
  if(!userId||!encry_password){
    return res.status(400).json({error:"Enter the feilds"});
  }
  const userr=User.findOne({userId: userId})
  .then((user)=>{
    if(!user){
      return res.status(400).json({error:"USER NOT REGISTERED"});
    }
    else{
      bcrypt.compare(req.body.userId,user.userId)
      .then((err)=>{
        if(err)
        {
          return res.status(422).json({error:"Invalid CREDENTIALS"})
        }
       else{
        var token = jwt.sign({username:userId}, process.env.SECRET,{expiresIn: 999999});
        res.cookie("token",token,{expire: new Date() + 9999})
        res.status(200).json({message:"SUCESSFULLY LOGED IN",token:token});
       }
      })
    }
  })
}

 //user signout
module.exports.signout =(req, res) =>{
  res.clearCookie("token");
  res.json({
    message: "User signout sucessful"
  });
    
}
// signned in 
module.exports.isSignedIn = expressJwt({
  secret:process.env.SECRET,
  algorithms: ['HS256'] ,
  userProperty:"auth"
});

//authenticated
module.exports.isAuthenticated=  (req, res,next) =>{
  let checkjwt=req.profile&&req.auth&&req.profile.userId==req.auth.username;
  //   console.log(req.profile);
  //   console.log(req.auth);
  //   console.log(req.profile._id);
  //   console.log(req.auth._id);
  // console.log(checkjwt);
  if(!checkjwt){
    return res.status(400).json({error:"ACCESS DENIED"})
  }
  next();
}

