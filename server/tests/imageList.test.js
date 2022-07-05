const { expect } = require("chai");
const {faker} = require('@faker-js/faker');
const sinon = require('sinon');
const db = require('../models');

// definitions
const { PERMISSIONS } = require("../definitions/permissions");
const { STATUSES } = require("../definitions/statuses");

// file being tested
const { ImageList} = require('../controllers/imageList');

describe("ImageList_constructor_create", function () {
    it("Should create class: ImageList()", () => {
        const list = new ImageList();
        // user is going to be an object
        /* ImageList should have
         * list : array
         * pages: number
         * count: number
         * */
        expect(list).to.have.property('list');
        expect(list).to.have.property('pages');
        expect(list).to.have.property('count');
    });
});

describe("ImageList_find_returns-list", function() {
    it('should return an array', async () => {
        /*
        The ImageList class method find should return an array of objects.
         */

        const list = new ImageList();
        await list.find();
        expect(list.list).to.be.an('array');
    });

    it('should return an array of at least 1 object', async () => {
        /*
        The ImageList class method finds at least 1 image and returns it on its list property.
         */
        const data = [{id: 1, name: 'test', alt: 'test', url: faker.internet.url(), awsKey: faker.lorem.word(), createdAt: new Date().toISOString()}]
        const findStub = sinon.stub(db.images, 'findAll').returns(Promise.resolve(data));
        const countStub = sinon.stub(db.images, 'count').returns(1);

        const list = new ImageList();
        await list.find();

        const dbQuery = findStub.getCall(0).args[0];

        expect(dbQuery).to.eql({limit: 12, offset: 0});
        expect(list.list).to.be.an('array');
        expect(list.list.length).to.be.greaterThan(0);

        findStub.restore();
        countStub.restore();
    });

    it('should return an array of at least 1 object based on a name search', async () => {
        /*
        The ImageList class method finds at least 1 image and returns it on its list property when provided
        with a name parameter.
         */
        const data = [{id: 1, name: 'test', alt: 'test', url: faker.internet.url(), awsKey: faker.lorem.word(), createdAt: new Date().toISOString()}]
        const findStub = sinon.stub(db.images, 'findAll').returns(Promise.resolve(data));
        const countStub = sinon.stub(db.images, 'count').returns(1);

        const list = new ImageList();
        await list.find(data[0].name);

        const dbQuery = findStub.getCall(0).args[0];

        expect(dbQuery).to.eql({where: {name: data[0].name}, limit: 12, offset: 0})
        expect(list.list).to.be.an('array');
        expect(list.list.length).to.be.greaterThan(0);
        expect(list.count).to.equal(1);
        expect(list.pages).to.equal(1);

        findStub.restore();
        countStub.restore();
    });
})
