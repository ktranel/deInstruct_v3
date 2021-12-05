const { expect } = require("chai");
const faker = require("faker");
const sinon = require('sinon');
const db = require('../models');

// definitions
const { PERMISSIONS } = require("../definitions/permissions");
const { STATUSES } = require("../definitions/statuses");

// file being tested
const { User } = require("../controllers/user");

describe("basic skeleton of a user", function () {
  it("should instantiate a basic user", () => {
    const user = new User();
    // user is going to be an object
    /* User should have
     * - id
     * - name
     * - email
     * - permissionId
     * - statusId
     * */
    expect(user).to.be.an("object");
    expect(user).to.have.property("id");
    expect(user).to.have.property("name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("permissionId");
    expect(user).to.have.property("statusId");
  });

  it("should create a new member user", async function () {
    /*
     * - should invoke the new user class
     * - should create a user in database
     * - should spread new data over user instance
     */
    const userInfo = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      permissionId: PERMISSIONS.MEMBER,
      statusId: STATUSES.USER.ACTIVE,
    };

    const data = {
      id: 1234,
      name: userInfo.name,
      email: userInfo.email,
      permissionId: userInfo.permissionId,
      statusId: userInfo.statusId,
    };

    //stubs
    const createStub = sinon.stub(db.users, 'create').returns(Promise.resolve(data));
    const user = new User();
    await user.createUser();
    expect(createStub.callCount).to.equal(1);
    expect(user.id).to.not.be.null;
    expect(user.name).to.equal(userInfo.name);
    expect(user.email).to.equal(userInfo.email);
    expect(user.permissionId).to.equal(PERMISSIONS.MEMBER);
    expect(user.statusId).to.equal(STATUSES.USER.ACTIVE);
    db.users.create.restore();
  });
});
