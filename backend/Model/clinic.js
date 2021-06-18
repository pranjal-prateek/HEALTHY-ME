const mongoose = require('mongoose');


const clinicSchema =new mongoose.Schema({
    clinicname:{
        type:String,
        trim:true,
        required:[true,"Name is required"]
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    city:{
        type:String,
        trim:true,
        required:true
    },
    state:{
        type:String,
        trim:true,
        required:true
    },
    zipCode:{
        type:Number,
        trim:true,
        required:true,
    },
    userCreated:{
        type:Date,
        default:Date.now,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
      },
});


const Clinic= mongoose.model('Clinic',clinicSchema);

module.exports =Clinic;