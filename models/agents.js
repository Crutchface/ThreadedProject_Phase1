// Import Datatypes
const {DataTypes}= require('sequelize');

// Import connection 
const sequelize=require('../utils/database');

// creating the model
const Agents = sequelize.define('agents', {
    AgentId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    AgtFirstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AgtMiddleInitial:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AgtLastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AgtBusPhone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AgtEmail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AgtPosition:{
        type: DataTypes.STRING,
        allowNull: false
    },
    AgencyId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});
module.exports = Agents;
