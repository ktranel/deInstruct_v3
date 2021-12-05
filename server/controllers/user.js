const db = require('../models');

class User{
    constructor() {
        this.id = null;
        this.name = '';
        this.email = '';
        this.permissionId = null;
        this.statusId = null;
    }

    async createUser(obj) {
        const created = await db.users.create(obj);
        this.id = created.id;
        this.name = created.name;
        this.email = created.email;
        this.permissionId = created.permissionId;
        this.statusId = created.statusId;
    }
}

module.exports = {
    User
}