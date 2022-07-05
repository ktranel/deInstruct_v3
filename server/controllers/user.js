const db = require('../models');

class User{
    constructor(props={}) {
        this.id = props.id || null;
        this.name = '';
        this.email = '';
        this.permissionId = null;
        this.statusId = null;
        this.createdAt = null;
    }

    // create a user
    async createUser(obj) {
        const created = await db.users.create(obj);
        this.id = created.id;
        this.name = created.name;
        this.email = created.email;
        this.permissionId = created.permissionId;
        this.statusId = created.statusId;
        this.createdAt = created.createdAt;
    }

    // get a user
    async getUser(search={id: null, email: null}) {
        const queryObject = {};
        if (search.email) queryObject.where = {email: search.email};
        if (search.id || this.id) queryObject.where = {id: search.id || this.id};
        const info = await db.users.findOne(queryObject);
        if (!info) return;
        this.id = info.id;
        this.name = info.name;
        this.email = info.email;
        this.permissionId = info.permissionId;
        this.statusId = info.statusId;
        this.createdAt = info.createdAt;
    }

    // get a users password
    async getPassword() {
        const info = await db.users.findOne({
            where: {id: this.id}
        });
        return info.password;
    }
}

module.exports = {
    User
}