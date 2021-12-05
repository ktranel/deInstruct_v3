'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'loginActivityId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'loginActivityId', Sequelize.INTEGER,);
  }
};
