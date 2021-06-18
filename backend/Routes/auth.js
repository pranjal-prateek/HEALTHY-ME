const express = require('express');
const User =require('../Model/user');
const { check } = require('express-validator');
const Router=express.Router();
//using controllers/
const {signout,signup,signin}=require('../Controllers/auth')
//signup route
Router.post("/signup",signup);
//signinroute
Router.post("/signin",signin);
// //sign out 
Router.get("/signout",signout);


//exporting route
module.exports =Router;