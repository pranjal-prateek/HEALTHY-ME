const User = require('../Model/user');


module.exports.getUserById=(req,res,next,id)=>{

    User.findById(id).exec((err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error:"USER NOT FOUND"
            });
        }
        req.profile=user;
        next();
    });
};


module.exports.getUser=(req,res)=>{
    //TODO: have to hide some feilds
    
    return res.json(req.profile)
};



module.exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,userFindAndModify:false},
        (err,user)=>{
           if(err|| !user){
               return res.status(400).json({
                   error:"USER NOT AUTHENTICATED"
               });
           }
           res.json(user);
       }
    )
};
module.exports.deleteUser=(req,res)=>{
    User.findByIdAndDelete(
        {_id:req.profile._id},
        (err)=>{
            if(err){
                return res.status(400).json({error:"USER CANNOT BE DELETED"})
            }
            return res.json({message:"USER DELETED SUCESSFULly"})
        }
    )
}

