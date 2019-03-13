const Sequelize = require('sequelize');
const db = require('../config/database');

const Telefono = db.define('Telefonos', {
    nCedula:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Telefono;
