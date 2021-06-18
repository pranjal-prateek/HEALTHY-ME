const mongoose = require('mongoose');


const medicineSchema =new mongoose.Schema({
    medicineName:{
        type:String,
        trim:true,
        required:true
    },
    medicineQuantity:{
        type:Number,
        trim:true,
        required:true,
    },
    timetotake:{
        type:String,
        trim:true,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
      },
});


const Medicine=mongoose.model('Medicine',medicineSchema);



module.exports =Medicine;