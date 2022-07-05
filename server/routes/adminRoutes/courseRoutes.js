const express = require('express');
const router = express.Router();

// utilities
const responseHandler = require('../../utilities/responseHandler');
const blockNonAdmins = require('../../utilities/blockNonAdmin');

// controllers

/*
route to get a list of courses
 */
router.get('/list', blockNonAdmins, responseHandler(async (req) => {
    return [];
}));

module.exports = router;