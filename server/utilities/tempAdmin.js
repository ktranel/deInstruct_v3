const db = require('../models');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {STATUSES} = require('../definitions/statuses');
const {PERMISSIONS} = require('../definitions/permissions');
const {faker} = require('@faker-js/faker');

class TempAdmins{
    constructor(){
        this.id = null;
        this.name = null;
        this.email = null;
        this.password = null;
        this.hash = null;
    }

    async create() {
        this.password = _.pad(faker.internet.password(), 8,'_')
        this.hash = await hashPassword(this.password);
        this.name = `${faker.name.firstName()} ${faker.name.lastName(0)}`;
        this.email = faker.internet.email();
        const user = await db.users.create({
            name: this.name,
            email: this.email,
            password: this.hash,
            refreshToken: this.hash,
            statusId: STATUSES.USER.ACTIVE,
            permissionId: PERMISSIONS.ADMIN,
        });
        this.id = user.id;
    }

    async destroy() {
        return db.users.destroy( {
            force: true,
            where: {
                id: this.id,
            }
        });
    }
}

module.exports = { TempAdmins };

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return reject(err);
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) return reject(error);
                return resolve(hash);
            });
        });
    })
}