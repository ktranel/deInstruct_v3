const db = require('../models');

class ImageList{
    constructor() {
        this.list = [];
        this.pages = 0;
        this.count = 0;
    }

    async find(name='', page =1) {
        const limit = 12;
        const offset = limit * (page - 1);
        const query = {limit, offset,};
        if (name) query.where = {name};
        const count = await db.images.count(query);
        this.list = await db.images.findAll(query);
        this.count = count;
        this.pages = Math.ceil(count / limit);
    }
}

module.exports = {ImageList};