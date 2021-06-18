const Symptom=require('../Model/symptom')
const _ = require("lodash");
const User=require('../Model/user.js');
const { set } = require('lodash');
module.exports.getSymptomById=(req, res,next,id) =>{
    Symptom.findById(id)
    .exec((err,symptom)=>{
        if(err ||!symptom){
            return res.status(404).json({error:"symptom not found"});
        }
      req.symptom=symptom;
      next();
    })
}
module.exports.createSymptom=(req,res)=>{
    const symptom=new Symptom(req.body);
    symptom.user=req.profile._id;
    symptom.save((err,symptom)=>{
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
                    user.symptoms.push(symptom._id);
                    
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

function getsymptomDetails(symptomID)
{
    //console.log(doct.findById(clinicID))
    return Promise.resolve(Symptom.findById(symptomID))
    
};
module.exports.getSymptom= async (req,res,)=>{
  let results = new Array();
        for await (const i of req.profile.symptoms)
        {
           //console.log(i)
            let ans;
            let addResult = getsymptomDetails(i).then(function(val)
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

module.exports.getSymptoms=(req,res) =>{
    Symptom.find(req.medicine._id)
    .exec((err,symptom)=>{
        if(err){
            return res.status(400).json({error:"Symptom cannot be retrived"})
        }
        return res.status(200).json(symptom)
    })
}
module.exports.updateSymptom=(req, res)=>{
    // console.log(req.body);
    // console.log(req.profile);
    // console.log(req.symptom)
    Symptom.findByIdAndUpdate(
        {_id:req.symptom._id},
        {$set:req.body},
        {new:true,userFindAndModify:false},
        (err,symptom)=>{
           if(err|| !symptom){
               return res.status(400).json({
                   error:"Symptom details Not Updated"
               });
           }
           res.json(symptom);
       }
    )
    }


    module.exports.deleteSymptom=(req, res)=>{
        // console.log("hey")
         Symptom.findByIdAndDelete(req.symptom._id)
         .exec(err=>{
             if(err){
                 return res.status(400).json({error:"Cant Delete symptom"})
             }
           //  console.log("user deleted")
             
             return res.status(200).json({message:"symptom deleted"})
     
         })
     }