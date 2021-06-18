const express = require('express');
const {isSignedIn,isAuthenticated}=require('../Controllers/auth');
const {getUserById}=require('../Controllers/user');
const {getMedicineById, createMedicine,getMedicine,getMedicines,updateMedicine,deleteMedicine}=require('../Controllers/medicine');
const Router=express.Router();


//params
Router.param("userId",getUserById);
Router.param("medicineId",getMedicineById);

Router.post(
    "/medicine/create/:userId",
    isSignedIn,
    isAuthenticated,
    createMedicine
);

Router.get("/medicine/all/:userId",getMedicine);

Router.get("/medicine/:medicineId",getMedicines);

Router.put(
    "/medicine/:medicineId/:userId",
    isSignedIn,
    isAuthenticated,
    updateMedicine
    );

    Router.delete(
        "/medicine/:medicineId/:userId",
        isSignedIn,
        isAuthenticated,
        deleteMedicine
    );
    
    module.exports=Router;