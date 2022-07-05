const db = require('../models');
const {DRAFT} = require('../definitions/courseStatuses');

class Course{
    constructor(props) {
        this.id = null;
        this.title = null;
        this.status = null;
        this.statusId = null;
        this.subject = null;
        this.subjectId = null;
    }

    async create(name) {
        const created = await db.courses.create({
            name,
            courseStatusId: DRAFT,
            subject: null,
        });
        const status = await db.courseStatuses.findOne({where: {id: DRAFT}});
        this.id = created.id;
        this.name = created.name;
        this.status = status.status;
        this.statusId = status.id;
    }

}

module.exports = {Course};