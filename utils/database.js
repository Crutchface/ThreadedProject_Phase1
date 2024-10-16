const Sequelize = require('sequelize');

// Create connection credentials to db
const sequelize=new Sequelize('travelexperts', 'root', '1q12w23e3=ilY', {
    host: 'localhost',
    dialect: 'mysql'
});
// exports the connection
module.exports= sequelize;