const express = require('express');
const {isSignedIn,isAuthenticated}=require('../Controllers/auth');
const {getUserById}=require('../Controllers/user');
const {getAppointmentById, createAppointment,getAppointment,getAppointments,updateAppointment,deleteAppointment}=require('../Controllers/appointment')
const Router=express.Router();

//params
Router.param("userId",getUserById);
Router.param("appointmentId",getAppointmentById);


//routes


//creating appointments
 Router.post(
     "/appointment/create/:userId",
     isSignedIn,
     isAuthenticated,
     createAppointment
 );

 
//  //getting all the appointments for a user
 Router.get("/appointment/all/:userId",getAppointment);
 //get a  appointment
 Router.get("/appointment/:appointmentId",getAppointments);

//  //updating appointment
 Router.put(
     "/appointment/:appointmentId/:userId",
     isSignedIn,
     isAuthenticated,
     updateAppointment
     );

 //delete appointment    
Router.delete(
    "/appointment/:appointmentId/:userId",
    isSignedIn,
    isAuthenticated,
 deleteAppointment
);

module.exports=Router;