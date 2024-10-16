// Import Datatypes
const { DataTypes } = require("sequelize");

// Import connection
const sequelize = require("../utils/database");

// creating the model
const Agency = sequelize.define(
  "agency",
  {
    AgencyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    AgncyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgncyCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgncyProv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgncyPostal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgncyCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgncyPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgncyFax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Agency;
