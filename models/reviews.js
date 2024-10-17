const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Reviews = sequelize.define(
  "reviews",
  {
    ReviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      
    },
    reviewFirstName: {
      type: DataTypes.STRING,
    },
    reviewLastName: {
      type: DataTypes.STRING,
    },
    reviewDescript: {
      type: DataTypes.STRING,
    },
    reviewRating: {
      type: DataTypes.INTEGER,
    },
    packageId: {
        type: DataTypes.INTEGER
    }
   
  },
  {
    timestamps: false,
  }
);

module.exports = Reviews;