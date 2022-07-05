const {PERMISSIONS} = require('../definitions/permissions');
module.exports = function (req, res, next) {
    if(parseInt(req.permissionId) !== PERMISSIONS.ADMIN) return res.status(404).send({message:"Access Denied"});
    return next();
};