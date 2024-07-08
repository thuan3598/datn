"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  data.init(
    {
        id_location:DataTypes.INTEGER,
        pm25: DataTypes.FLOAT,
        pm10: DataTypes.FLOAT,
        temp: DataTypes.FLOAT,
        humi: DataTypes.INTEGER,
        co2: DataTypes.INTEGER,
        aqi:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "data",
    }
  );
  return data;
};
