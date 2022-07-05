'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
        'subjects',
        [
            { id: 1, name: "Math", createdAt: new Date(), updatedAt: new Date()},
            { id: 2, name: "Chemistry", createdAt: new Date(), updatedAt: new Date()},
            { id: 3, name: "Biology", createdAt: new Date(), updatedAt: new Date()},
            { id: 4, name: "Physics", createdAt: new Date(), updatedAt: new Date()}
        ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
