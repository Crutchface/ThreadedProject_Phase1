// Import Datatypes
const {DataTypes}= require('sequelize');

// Import connection 
const sequelize=require('../utils/database');

// creating the model
const tripTypes = sequelize.define('tripTypes', {
    TripTypeId:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    TTName:{
        type: DataTypes.STRING,
        allowNull: false
    }
   
},{
    timestamps: false
});
module.exports = tripTypes;
