"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("data", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pm25: {
        type: Sequelize.FLOAT,
      },
      pm10: {
        type: Sequelize.FLOAT,
      },
      temp: {
        type: Sequelize.FLOAT,
      },
      humi: {
        type: Sequelize.INTEGER,
      },
      co2: {
        type: Sequelize.INTEGER,
      },
      aqi: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("data");
  },
};
