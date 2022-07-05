const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  images.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    alt: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    awsKey: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'images',
  });
  return images;
};