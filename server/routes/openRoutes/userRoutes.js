const express = require('express');
const router = express.Router();

// utilities
const responseHandler = require('../../utilities/responseHandler');

/*
route to sign up a member
@body
 - name: string
 - email: string
 - password: string
 */
router.post('/signup', responseHandler(async => {
    return 'test 2';
}));

module.exports = router;