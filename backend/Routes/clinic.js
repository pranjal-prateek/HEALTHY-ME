const express = require('express');
const {isSignedIn,isAuthenticated}=require('../Controllers/auth');
const {getUserById}=require('../Controllers/user');
const {getClinicById, createClinic,getClinic,getClinics,updateClinic,deleteClinic}=require('../Controllers/clinic');
const Router=express.Router();


//params
Router.param("userId",getUserById);
Router.param("clinicId",getClinicById);


//routes


//creating appointments
 Router.post(
     "/clinic/create/:userId",
     isSignedIn,
     isAuthenticated,
     createClinic
 );

 
//  //getting all the appointments for a user
 Router.get("/clinic/all/:userId",getClinic);
//  //get a  appointment
 Router.get("/clinic/:clinicId",getClinics);

// //  //updating appointment
 Router.put(
     "/clinic/:clinicId/:userId",
     isSignedIn,
     isAuthenticated,
     updateClinic
     );

 //delete appointment    
Router.delete(
    "/clinic/:clinicId/:userId",
    isSignedIn,
    isAuthenticated,
    deleteClinic
);

module.exports=Router;