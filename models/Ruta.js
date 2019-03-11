const Sequelize = require('sequelize');
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');

const Ruta = db.define('Rutas', {
    nRuta:{
        type: Sequelize.INTEGER,
        autoincrement:true,
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
    },
    escala:{
        type: Sequelize.INTEGER,
    }
});


module.exports = Ruta;