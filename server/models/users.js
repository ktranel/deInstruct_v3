'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.permissions);
    }
  }
  users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};