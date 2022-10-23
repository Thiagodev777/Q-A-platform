const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.NAME_DATABASE, process.env.USERNAME_DATABASE, process.env.PASSWORD_DATABASE, {
    host: process.env.HOST,
    dialect: process.env.DATABASE_TYPE
});
module.exports = connection;