const Sequelize = require('sequelize');
const db = require('../config/database');
const AvionRuta = require('../models/AvionRuta');

const Ruta = db.define('Rutas', {
    nRuta:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
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
    dist:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    pBase:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Ruta;