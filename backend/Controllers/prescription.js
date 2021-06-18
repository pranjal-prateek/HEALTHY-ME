const Prescription=require('../Model/prescription')
const _ = require("lodash");
const User=require('../Model/user.js');
const { set } = require('lodash');
module.exports.getPrescriptionById=(req, res,next,id) =>{
    Prescription.findById(id)
    .exec((err,prescription)=>{
        if(err ||!prescription){
            return res.status(404).json({error:"prescription not found"});
        }
      req.prescription=prescription;
      next();
    })
}
module.exports.createPrescription=(req,res)=>{
    const prescription=new Prescription(req.body);
    prescription.user=req.profile._id;
    prescription.save((err,prescription)=>{
        if(err){
            return res.status(400).json(err);
        }
       
        // console.log(req.profile._id)
        else{
            User.findById(req.profile._id)
            .exec((err,user)=>{
                if(err){
                    return res.status(400).json(err);
                }
                else{
                    user.prescriptions.push(prescription._id);
                    
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

function getprescriptionDetails(prescriptionID)
{
    //console.log(doct.findById(clinicID))
    return Promise.resolve(Prescription.findById(prescriptionID))
    
};
module.exports.getPrescription= async (req,res,)=>{
  let results = new Array();
        for await (const i of req.profile.prescriptions)
        {
           //console.log(i)
            let ans;
            let addResult = getprescriptionDetails(i).then(function(val)
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

module.exports.getPrescriptions=(req,res) =>{
    Prescription.find(req.medicine._id)
    .exec((err,prescription)=>{
        if(err){
            return res.status(400).json({error:"Prescription cannot be retrived"})
        }
        return res.status(200).json(prescription)
    })
}
module.exports.updatePrescription=(req, res)=>{
    // console.log(req.body);
    // console.log(req.profile);
    // console.log(req.medicine)
    Prescription.findByIdAndUpdate(
        {_id:req.prescription._id},
        {$set:req.body},
        {new:true,userFindAndModify:false},
        (err,prescription)=>{
           if(err|| !prescription){
               return res.status(400).json({
                   error:"Prescription details Not Updated"
               });
           }
           res.json(prescription);
       }
    )
    }


    module.exports.deletePrescription=(req, res)=>{
        // console.log("hey")
         Prescription.findByIdAndDelete(req.prescription._id)
         .exec(err=>{
             if(err){
                 return res.status(400).json({error:"Cant Delete prescription"})
             }
           //  console.log("user deleted")
             
             return res.status(200).json({message:"prescription deleted"})
     
         })
     }