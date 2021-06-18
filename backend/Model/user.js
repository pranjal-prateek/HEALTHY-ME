const mongoose = require('mongoose');
// var validator = require('validator');
var bcrypt = require('bcryptjs');
const {ObjectId}=mongoose.Schema;
//TODO:validations



const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: [true,'First Name is required'],
        trim:true,
    },
    middleName:{
        type:String,
        trim:true,

    },
    lastName:{
        type:String,
        trim:true,
        required: [true,'Last Name is required'],

    },
    userId:{
        type:String,
        unique:true,
        required: [true,'Userid is requires'],
    },
    age:{
        type:Number,
        required:[true,'Age is required'],
    },
    phoneNumber:{
        type:String,
        required:[true,'Phone Number is required']
        
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Email is required'],
       
    },
    encry_password:{
        type:String,
        required:true,
       
         
    },
    userCreated: {
        type: Date,
        default: Date.now,
      },
      //populating fields
      appointments:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Appointment'
          }
      ],
      clinics:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Clinic'
          }
      ],
      doctors:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Doctor'
          }
      ],
      generals:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'General'
          }
      ],
      medicines:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Medicine'
          }
      ],
      prescriptions:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Prescription'
          }
      ],
      symptoms:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:'Symptom'
          }
      ],
});

///hashing the password
userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error(err)
      bcrypt.hash(user.encry_password, salt, (err, hash) => {
        user.encry_password = hash;
        // console.log(user.encry_password)
        next()
      })
    })
  })

const User=new mongoose.model('User',userSchema);

module.exports =User;



