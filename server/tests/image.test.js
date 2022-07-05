const { expect } = require("chai");
const {faker} = require('@faker-js/faker');
const sinon = require('sinon');
const db = require('../models');

// definitions
const { PERMISSIONS } = require("../definitions/permissions");
const { STATUSES } = require("../definitions/statuses");

// file being tested
const { Image } = require("../controllers/image");

describe("Image_constructor_create", function () {
    it("Should create class: Image()", () => {
        const image = new Image();
        // user is going to be an object
        /* Image should have
         * - id
         * - name
         * - alt
         * - url
         * - awsKey
         * */
        expect(image).to.be.an("object");
        expect(image).to.have.property("id");
        expect(image).to.have.property("name");
        expect(image).to.have.property("alt");
        expect(image).to.have.property("url");
        expect(image).to.have.property("awsKey");
    });
});

describe("Image_update_invoke", function () {
    it("Should update an already established images name", async () => {
        /* The Image class should have a method on it called update which
         * takes in a new name and updates the image instance.
          */
        const image = new Image();
        await image.update('new name');

        expect(image.name).to.equal('new name');
    });
});
