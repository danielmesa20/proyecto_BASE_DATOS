const Sequelize = require('sequelize');
module. exports = new Sequelize('aeropuerto', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

/*
const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;

const { DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize; */