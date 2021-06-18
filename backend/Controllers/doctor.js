const Doctor=require('../Model/doctor')
const _ = require("lodash");
const User=require('../Model/user.js');
const { set } = require('lodash');
module.exports.getDoctorById=(req, res,next,id) =>{
    Doctor.findById(id)
    .exec((err,doctor)=>{
        if(err ||!doctor){
            return res.status(404).json({error:"Doctor not found"});
        }
      req.doctor=doctor;
      next();
    })
}
module.exports.createDoctor=(req,res)=>{
    const doctor=new Doctor(req.body);
    doctor.user=req.profile._id;
    doctor.save((err,doctor)=>{
        if(err){
            return res.status(400).json(err);
        }
        // console.log(Clinic);
        // console.log(req.profile._id)
        else{
            User.findById(req.profile._id)
            .exec((err,user)=>{
                if(err){
                    return res.status(400).json(err);
                }
                else{
                    user.doctors.push(doctor._id);
                    // console.log(clinic)
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

function getdoctorDetails(doctorID)
{
    //console.log(doct.findById(clinicID))
    return Promise.resolve(Doctor.findById(doctorID))
    
};
module.exports.getDoctor= async (req,res,)=>{
  let results = new Array();
        for await (const i of req.profile.doctors)
        {
           //console.log(i)
            let ans;
            let addResult = getdoctorDetails(i).then(function(val)
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

module.exports.getDoctors=(req,res) =>{
    Doctor.find(req.doctor._id)
    .exec((err,doctor)=>{
        if(err){
            return res.status(400).json({error:"doctor cannot be retrived"})
        }
        return res.status(200).json(doctor)
    })
}
module.exports.updateDoctor=(req, res)=>{
    // console.log(req.body);
    // console.log(req.profile);
    // console.log(req.doctor)
    Doctor.findByIdAndUpdate(
        {_id:req.doctor._id},
        {$set:req.body},
        {new:true,userFindAndModify:false},
        (err,doctor)=>{
           if(err|| !doctor){
               return res.status(400).json({
                   error:"Doctor details Not Updated"
               });
           }
           res.json(doctor);
       }
    )
    }


    module.exports.deleteDoctor=(req, res)=>{
        // console.log("hey")
         Doctor.findByIdAndDelete(req.doctor._id)
         .exec(err=>{
             if(err){
                 return res.status(400).json({error:"Cant Delete Doctor"})
             }
           //  console.log("user deleted")
             
             return res.status(200).json({message:"Doctor deleted"})
     
         })
     }