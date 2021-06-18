const express = require('express');

const Router=express.Router();


const {getUserById,getUser,updateUser,deleteUser} =require('../Controllers/user');


const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//getting the parameted user id of the user
Router.param("userId",getUserById);
//get the user info
Router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
//if the user want to update the profile
Router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
//if user want to delete the 
Router.delete("/user/:userId",isSignedIn,isAuthenticated,deleteUser);

//expoting the router
module.exports =Router;