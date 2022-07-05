const express = require('express');
const router = express.Router();
const passport = require('passport');

// utilities
const responseHandler = require('../../utilities/responseHandler');
const {ErrorHandler} = require('../../utilities/errorHandler');
const {VALIDATION} = require('../../definitions/errors');
/*
Route for logging in on the web portal
 */
router.post('/web-login', (req, res, next)=>{
        if(req.isAuthenticated()){
            req.session.touch();
        }
        next();
    },
    passport.authenticate('local'),
    responseHandler(async req => {
    const { id } = req.user;
    return id;
}))

router.get('/web-login-check', responseHandler(async req => {
    if (!req.isAuthenticated()) return null;
    req.session.touch();
    return req.user;
}));

module.exports = router;