// each request that comes through will have a req.user if the user is logged in
const db = require('../models');

module.exports = (req, res, next)=>{
    const id = req.user ? req.user.id : null;
    if(id){
        db.users.findOne({where: {id}})
            .then(user => {
                req.permissionId = user.permissionId;
                req.statusId = user.statusId;
                next();
            }).catch(err=>res.status(404).send({message:"User id not Found", error : err}));
    }else{
        next();
    }
};