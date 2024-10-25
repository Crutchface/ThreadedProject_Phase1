// Schema to create reviews form
// CREATE TABLE `travelexperts`.`reviews` (
//     `ReviewId` INT NOT NULL AUTO_INCREMENT,
//     `reviewFirstName` VARCHAR(45) NOT NULL,
//     `reviewLastName` VARCHAR(45) NOT NULL,
//     `reviewDescript` VARCHAR(240) NOT NULL,
//     `reviewRating` INT NOT NULL,
//     `packageId` INT NOT NULL,
//     PRIMARY KEY (`ReviewId`),
//     UNIQUE INDEX `idnew_table_UNIQUE` (`ReviewId` ASC) VISIBLE);


const Sequelize = require('sequelize');

// Create connection credentials to db
const sequelize=new Sequelize('travelexperts', 'root', 'ninrez', {
    host: 'localhost',
    dialect: 'mysql'
});
// exports the connection
module.exports= sequelize;