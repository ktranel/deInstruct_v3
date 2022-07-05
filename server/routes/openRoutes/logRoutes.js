const express = require('express');
const router = express.Router();

const responseHandler = require('../../utilities/responseHandler');
const {ErrorHandler} = require('../../utilities/errorHandler');
const {MOBILE, WEB, ERROR} = require('../../definitions/errors');

router.post('/', responseHandler(async req => {
    const {message, origin} = req.body;

    if (origin === MOBILE) {
        throw new ErrorHandler(message, MOBILE);
    } else if (origin === WEB) {
        throw new ErrorHandler(message, WEB);
    } else{
        throw new ErrorHandler(message, ERROR);
    }
}))

module.exports = router;