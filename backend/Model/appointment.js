const mongoose = require('mongoose');

const {ObjectId}=mongoose.Schema;


const appointmentSchema=new mongoose.Schema({
    date:{
        type:String,
        trim:true,
        required:[true,"date is required"]
    },
    time:{
        type:String,
        trim:true,
        required:[true,"time is required"]
    },
    doctor:{
        type:String,
        trim:true,
        required:[true,"doctor is required"],
    },
    appointmentReason:{
        type:String,
        trim:true,
    },
    
   
    userCreated:{
        type:Date,
        default:Date.now,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
     
      },
 

});


const Appointment=mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;