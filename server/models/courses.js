'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  courses.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      required: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    courseStatusId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'courses',
  });
  return courses;
};