const express = require('express');
const router = express.Router();

// utilities
const responseHandler = require('../../utilities/responseHandler');

// controllers
const {User} = require('../../controllers/user');

/*
route to get a user
 */
router.get('/', responseHandler(async (req) => {
    if (!req.user) return null;

    const {id} = req.user;
    const user1 = new User({id});
    await user1.getUser()
    return user1;
}));

module.exports = router;