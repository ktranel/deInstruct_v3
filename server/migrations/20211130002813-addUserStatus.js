'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'statusId', Sequelize.INTEGER,);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'statusId',);
  }
};
