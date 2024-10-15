// Import Datatypes
const {DataTypes}= require('sequelize');

// Import connection 
const sequelize=require('../utils/database');

// creating the model
const Bookings = sequelize.define('bookings', {
    BookingId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    BookingDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    BookingNo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    TravelerCount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    CustomerId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TripTypeId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    PackageId:{
        type: DataTypes.STRING,
        allowNull: true
    }
    

},{
    timestamps: false
});
module.exports = Bookings;