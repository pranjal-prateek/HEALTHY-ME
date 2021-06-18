const Medicine=require('../Model/medicine')
const _ = require("lodash");
const User=require('../Model/user.js');
const { set } = require('lodash');
module.exports.getMedicineById=(req, res,next,id) =>{
    Medicine.findById(id)
    .exec((err,medicine)=>{
        if(err ||!medicine){
            return res.status(404).json({error:"medicine not found"});
        }
      req.medicine=medicine;
      next();
    })
}
module.exports.createMedicine=(req,res)=>{
    const medicine=new Medicine(req.body);
    medicine.user=req.profile._id;
    medicine.save((err,medicine)=>{
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
                    user.medicines.push(medicine._id);
                    
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

function getmedicineDetails(medicineID)
{
    //console.log(doct.findById(clinicID))
    return Promise.resolve(Medicine.findById(medicineID))
    
};
module.exports.getMedicine= async (req,res,)=>{
  let results = new Array();
        for await (const i of req.profile.medicines)
        {
           //console.log(i)
            let ans;
            let addResult = getmedicineDetails(i).then(function(val)
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

module.exports.getMedicines=(req,res) =>{
    Medicine.find(req.medicine._id)
    .exec((err,medicine)=>{
        if(err){
            return res.status(400).json({error:"Medicine cannot be retrived"})
        }
        return res.status(200).json(medicine)
    })
}
module.exports.updateMedicine=(req, res)=>{
    // console.log(req.body);
    // console.log(req.profile);
    // console.log(req.medicine)
    Medicine.findByIdAndUpdate(
        {_id:req.medicine._id},
        {$set:req.body},
        {new:true,userFindAndModify:false},
        (err,medicine)=>{
           if(err|| !medicine){
               return res.status(400).json({
                   error:"Medicine details Not Updated"
               });
           }
           res.json(medicine);
       }
    )
    }


    module.exports.deleteMedicine=(req, res)=>{
        // console.log("hey")
         Medicine.findByIdAndDelete(req.medicine._id)
         .exec(err=>{
             if(err){
                 return res.status(400).json({error:"Cant Delete medicine"})
             }
           //  console.log("user deleted")
             
             return res.status(200).json({message:"medicine deleted"})
     
         })
     }