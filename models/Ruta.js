const Sequelize = require('sequelize');
const db = require('../config/database');

const Ruta = db.define('Rutas', {
    nRuta:{
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