const mongoose = require('mongoose');


const doctorSchema =new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    clinic:{
        type:String,
        trime:true
    },
    phone:{
        type:String,
        trim:true,
        required:true
    },
    userCreated: {
        type: Date,
        default: Date.now,
      },
      user: {
        type:mongoose.Schema.Types.ObjectId,
      },
});


const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports =Doctor;