const Sequelize = require('sequelize');
const db = require('../config/database');

const Avion = db.define('aviones', {
    numero_avion:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fabricante:{
        type: Sequelize.STRING
    },
    modelo:{
        type: Sequelize.STRING
    },
    velocidad_max:{
        type: Sequelize.INTEGER
    },
    eliminado:{
        type: Sequelize.INTEGER
    }
});

module.exports = Avion