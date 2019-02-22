const Sequelize = require('sequelize');
const db = require('../config/database');

const Avion = db.define('aviones', {
    numero_avion:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fabricante:{
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    velocidad_max:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eliminado:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Avion;