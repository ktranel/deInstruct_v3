const express = require('express');
const router = express.Router();

/*
route to sign up a member
@body
 - name: string
 - email: string
 - password: string
 */
router.post('/signup', (req, res) => {
res.status(200).send('hi');
});

module.exports = router;