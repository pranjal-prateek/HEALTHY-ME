const mongoose = require('mongoose');


const symptomSchema =new mongoose.Schema({
    symptomTypes:{
        type:String,
        trim:true,
        required:true,
    },
    symptomDate:{
        type:String,
        trim:true,
        required:true,
    },
    symptomTime:{
        type:String,
        trim:true,
        required:true
    },
    symptomInfo:{
        type:String,
        trim:true,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
      },
});



const Symptom=mongoose.model('Symptom',symptomSchema);


module.exports =Symptom;