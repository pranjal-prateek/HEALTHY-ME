const express = require('express');
const {isSignedIn,isAuthenticated}=require('../Controllers/auth');
const {getUserById}=require('../Controllers/user');
const {getPrescriptionById, createPrescription,getPrescription,getPrescriptions,updatePrescription,deletePrescription}=require('../Controllers/medicine');
const Router=express.Router();


//params
Router.param("userId",getUserById);
Router.param("prescriptionId",getPrescriptionById);

Router.post(
    "/prescription/create/:userId",
    isSignedIn,
    isAuthenticated,
    createPrescription
);

Router.get("/prescription/all/:userId",getPrescription);

Router.get("/prescription/:prescriptionId",getPrescriptions);

Router.put(
    "/prescription/:prescriptionId/:userId",
    isSignedIn,
    isAuthenticated,
    updatePrescription
    );

    Router.delete(
        "/prescription/:prescriptionId/:userId",
        isSignedIn,
        isAuthenticated,
        deletePrescription
    );
    
    module.exports=Router;