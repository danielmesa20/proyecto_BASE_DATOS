const Sequelize = require('sequelize');
const db = require('../config/database');
const Ruta = require('../models/Ruta');
const Avion = require('../models/Avion');

const Vuelo = db.define('Vuelos', {
    numeroVuelo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaSalida:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaLlegada:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaRealLlegada:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    fechaRealSalida:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    mAvion:{
        type: Sequelize.STRING
    },
    ruta:{
        type: Sequelize.INTEGER
    },
    eliminado:{
        type: Sequelize.INTEGER
    }
});

Vuelo.belongsTo(Ruta, {foreignKey: 'ruta'});


module.exports = Vuelo;