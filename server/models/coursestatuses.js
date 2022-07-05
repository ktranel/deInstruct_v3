'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseStatuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  courseStatuses.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      required: true,
      allowNull: false,
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'courseStatuses',
  });
  return courseStatuses;
};