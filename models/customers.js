// Import Datatypes
const { DataTypes } = require("sequelize");

// Import connection
const sequelize = require("../utils/database");

// creating the model
const Customers = sequelize.define(
  "customers",
  {
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    CustFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustProv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustPostal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustPostal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustHomePhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustBusPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CustEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Customers;
