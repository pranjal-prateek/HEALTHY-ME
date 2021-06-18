const express = require('express');
const {isSignedIn,isAuthenticated}=require('../Controllers/auth');
const {getUserById}=require('../Controllers/user');
const {getDoctorById, createDoctor,getDoctor,getDoctors,updateDoctor,deleteDoctor}=require('../Controllers/doctor');
const Router=express.Router();


//params
Router.param("userId",getUserById);
Router.param("doctorId",getDoctorById);

Router.post(
    "/doctor/create/:userId",
    isSignedIn,
    isAuthenticated,
    createDoctor
);

Router.get("/doctor/all/:userId",getDoctor);

Router.get("/doctor/:doctorId",getDoctors);

Router.put(
    "/doctor/:doctorId/:userId",
    isSignedIn,
    isAuthenticated,
    updateDoctor
    );

    Router.delete(
        "/clinic/:doctorId/:userId",
        isSignedIn,
        isAuthenticated,
        deleteDoctor
    );
    
    module.exports=Router;