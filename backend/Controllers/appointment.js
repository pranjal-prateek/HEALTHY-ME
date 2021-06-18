const Appointment=require('../Model/appointment');
const _ = require("lodash");
const User=require('../Model/user.js');
const { set } = require('lodash');
//get Appoint by id
module.exports.getAppointmentById=(req, res,next,id) =>{
    Appointment.findById(id)
    .exec((err,appointment)=>{
        if(err ||!appointment){
            return res.status(400).json({error:"Appointment not found"});
        }
      req.appointment=appointment;
      next();
    })
}
//create an appointment
module.exports.createAppointment=(req,res)=>{
    const appointment=new Appointment(req.body);
    appointment.user=req.profile._id;
    appointment.save((err,appointment)=>{
        if(err){
            return res.status(400).json(err);
        }
        // console.log(appointment);
        // console.log(req.profile._id)
        else{
            User.findById(req.profile._id)
            .exec((err,user)=>{
                if(err){
                    return res.status(400).json(err);
                }
                else{
                    user.appointments.push(appointment._id);
                    // console.log(appointment)
                    // console.log(user)
                    user.save((err,user)=>{
                        if(err){
                            return res.status(400).json(err);
                        }
                        else
                        {
                            return res.json(user)
                        }
                    })
                }

            })
        }
    })

    
}

//get Appointment related to a user
function getAppointmentDetails(apppointmentID)
{
    //console.log(Appointment.findById(apppointmentID))
    return Promise.resolve(Appointment.findById(apppointmentID))
    
};
module.exports.getAppointment= async (req,res,)=>{
  let results = new Array();
        for await (const i of req.profile.appointments)
        {
           //console.log(i)
            let ans;
            let addResult = getAppointmentDetails(i).then(function(val)
            {
                ans = val;
                // console.log(val,"vallll")
                // console.log(ans,"for ke ")
            })

            await addResult;
            results.push(ans);
        }
       // console.log(results,"resdf");
        res.json(results)
  }
//get appointment
module.exports.getAppointments=(req,res) =>{
    Appointment.find(req.appointment._id)
    .exec((err,appointment)=>{
        if(err){
            return res.status(400).json({error:"Appoint cannot be retrived"})
        }
        return res.status(200).json(appointment)
    })
}


//update a appointment
module.exports.updateAppointment=(req, res)=>{
// console.log(req.body);
// console.log(req.profile);
// console.log(req.appointment)
Appointment.findByIdAndUpdate(
    {_id:req.appointment._id},
    {$set:req.body},
    {new:true,userFindAndModify:false},
    (err,appointment)=>{
       if(err|| !appointment){
           return res.status(400).json({
               error:"Appoint Not Updated"
           });
       }
       res.json(appointment);
   }
)
}
// function arrayRemove(arr, value) { 
    
//     return arr.filter(function(ele){ 
//         return ele != value; 
//     });
// }
//TODO: have to delete from the user appointment array
module.exports.deleteAppointment=(req, res)=>{
   // console.log("hey")
    Appointment.findByIdAndDelete(req.appointment._id)
    .exec(err=>{
        if(err){
            return res.status(400).json({error:"Cant Delete Appointment"})
        }
      //  console.log("user deleted")
        
        return res.status(200).json({message:"Appointment deleted"})

    })
}

