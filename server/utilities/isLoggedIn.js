const db = require('../models');

/* Check if a user is logged in. If so pass them through, otherwise end the request here */
module.exports = function (req, res, next) {
    if (req.user.id) {
        db.users.findOne({where:{id : req.user.id}})
            .then(user => {
                if(user){
                    if (req.isAuthenticated()){
                        next();
                    }
                }else{
                    return res.status(403).send({message:'Access Denied. Please login'});
                }
            })
    } else {
        return res.status(403).send({message:'Access Denied. Please login'});
    }

};