const Clinic=require('../Model/clinic')
const _ = require("lodash");
const User=require('../Model/user.js');
const { set } = require('lodash');
//get Clinic by id
module.exports.getClinicById=(req, res,next,id) =>{
    Clinic.findById(id)
    .exec((err,clinic)=>{
        if(err ||!Clinic){
            return res.status(400).json({error:"Clinic not found"});
        }
      req.clinic=clinic;
      next();
    })
}
//create an clinic
module.exports.createClinic=(req,res)=>{
    const clinic=new Clinic(req.body);
    clinic.user=req.profile._id;
    clinic.save((err,clinic)=>{
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
                    user.clinics.push(clinic._id);
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

// //get clinic related to a user
function getClinicDetails(clinicID)
{
    //console.log(Clinic.findById(clinicID))
    return Promise.resolve(Clinic.findById(clinicID))
    
};
module.exports.getClinic= async (req,res,)=>{
  let results = new Array();
        for await (const i of req.profile.clinics)
        {
           //console.log(i)
            let ans;
            let addResult = getClinicDetails(i).then(function(val)
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
// //get clinic
module.exports.getClinics=(req,res) =>{
    Clinic.find(req.clinic._id)
    .exec((err,clinic)=>{
        if(err){
            return res.status(400).json({error:"clinic cannot be retrived"})
        }
        return res.status(200).json(clinic)
    })
}


// //update a clinic
module.exports.updateClinic=(req, res)=>{
// console.log(req.body);
// console.log(req.profile);
// console.log(req.clinic)
Clinic.findByIdAndUpdate(
    {_id:req.clinic._id},
    {$set:req.body},
    {new:true,userFindAndModify:false},
    (err,clinic)=>{
       if(err|| !clinic){
           return res.status(400).json({
               error:"Appoint Not Updated"
           });
       }
       res.json(clinic);
   }
)
}
// // function arrayRemove(arr, value) { 
    
// //     return arr.filter(function(ele){ 
// //         return ele != value; 
// //     });
// // }
// //TODO: have to delete from the user clinics array
module.exports.deleteClinic=(req, res)=>{
   // console.log("hey")
    Clinic.findByIdAndDelete(req.clinic._id)
    .exec(err=>{
        if(err){
            return res.status(400).json({error:"Cant Delete Clinic"})
        }
      //  console.log("user deleted")
        
        return res.status(200).json({message:"Clinic deleted"})

    })
}

