const Sequelize = require('sequelize');
const db = require('../config/database');

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
    fechaLLegada:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaRealLLegada:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    fechaRealLLegada:{
        type: Sequelize.DATE,
        allowNull: false 
    },
    matriculaAvion:{
        type: Sequelize.INTEGER
    }
});

module.exports = Vuelo;