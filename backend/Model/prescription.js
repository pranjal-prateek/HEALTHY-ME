const mongoose = require('mongoose');


const prescriptionSchema=new mongoose.Schema({
    prescriptionName:{
        type:String,
        trim:true,
        required:[true,"Prescription is required"],
    },
    doctorPrescribed:{
        type:String,
        trim:true,
        required:[true,"Prescription is required"]
    },
     generalInstructions:{
         type:String,
         trim:true,
     },
     totalAmount:{
         type:Number,
         trim:true,
         required:true
     },
     user: {
        type:mongoose.Schema.Types.ObjectId,
      },
});


const Prescription=mongoose.model('Prescription',prescriptionSchema);


module.exports=Prescription;