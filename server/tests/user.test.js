const mocha = require('mocha');
const {expect} = require('chai');

// definitions
const {PERMISSIONS} = require('../definitions/permissions');
const {STATUSES} = require('../definitions/statuses');

// file being tested
const {User} = require('../controllers/user');

describe('basic skeleton of a user', function() {
    it('should instantiate a basic user', () => {
        const user = new User();
        // user is going to be an object
        /* User should have
        * - id
        * - name
        * - email
        * - permissionId
        * - statusId
        * */
        expect(user).to.be.an('object');
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('email');
        expect(user).to.have.property('permissionId');
        expect(user).to.have.property('statusId');
    });

    it('should invoke a new user', function() {

    });
});