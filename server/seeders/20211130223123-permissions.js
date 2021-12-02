'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('permissions', [
       {id: 1, permission: 'member', createdAt: new Date(), updatedAt: new Date()},
       {id: 2, permission: 'admin', createdAt: new Date(), updatedAt: new Date()},
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
