const Sequelize = require('sequelize');
const db = require('../config/database');

const Auth = db.define('auths', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Auth;
