const Sequelize = require('sequelize');
const db = require('../config/database');

const Ruta = db.define('Rutas', {
    numeroRuta:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    destino:{
        type: Sequelize.STRING,
        allowNull: false
    },
    origen:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numeroVuelo:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    distancia:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    precioBase:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    eliminado:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Ruta;