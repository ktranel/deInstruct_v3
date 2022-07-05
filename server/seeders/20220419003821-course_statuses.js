'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
        'courseStatuses',
        [
          { id: 1, status: "draft", createdAt: new Date(), updatedAt: new Date()},
          { id: 2, status: "active", createdAt: new Date(), updatedAt: new Date()},
          { id: 3, status: "archived", createdAt: new Date(), updatedAt: new Date()},
        ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courseStatuses', null, {});
  }
};
