const {DataTypes} = require('sequelize')

const sequelize = require('../utils/database')

const Packages = sequelize.define('packages', {
    PackageID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    PkgName:{
        type: DataTypes.STRING,
    },
    PkgStartDate:{
        type: DataTypes.DATE,
    },
    PkgEndDate:{
        type: DataTypes.DATE,
    },
    PkgDesc:{
        type: DataTypes.STRING,
    },
    PkgBasePrice:{
        type: DataTypes.DECIMAL,
    },
    PkgAgencyCommission:{
        type: DataTypes.DECIMAL
    }
},{
    timestamps: false
});
 
module.exports = Packages
