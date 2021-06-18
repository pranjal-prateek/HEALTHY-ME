const express = require('express');
const {isSignedIn,isAuthenticated}=require('../Controllers/auth');
const {getUserById}=require('../Controllers/user');
const {getSymptomById, createSymptom,getSymptom,getSymptoms,updateSymptom,deleteSymptom}=require('../Controllers/symptom');
const Router=express.Router();


//params
Router.param("userId",getUserById);
Router.param("symptomId",getSymptomById);

Router.post(
    "/symptom/create/:userId",
    isSignedIn,
    isAuthenticated,
    createSymptom
);

Router.get("/symptom/all/:userId",getSymptom);

Router.get("/symptom/:symptomId",getSymptoms);

Router.put(
    "/symptom/:symptomId/:userId",
    isSignedIn,
    isAuthenticated,
    updateSymptom
    );

    Router.delete(
        "/symptom/:symptomId/:userId",
        isSignedIn,
        isAuthenticated,
        deleteSymptom
    );
    
    module.exports=Router;