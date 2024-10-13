// Import Datatypes
const {DataTypes}= require('sequelize');

// Import connection 
const sequelize=require('../utils/database');

// creating the model
const Bookings = sequelize.define('bookings', {
    BookingId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    BookingDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    BookingNo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    TravelerCount:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CustomerId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    TripTypeId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    PackageId:{
        type: DataTypes.STRING,
        allowNull: false
    }
    

},{
    timestamps: false
});
module.exports = Bookings;