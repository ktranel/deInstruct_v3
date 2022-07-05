'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loginActivities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users);
    }
  }
  loginActivities.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      required: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'loginActivities',
  });
  return loginActivities;
};