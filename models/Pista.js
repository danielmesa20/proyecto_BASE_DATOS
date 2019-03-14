const Sequelize = require('sequelize');
const db = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');

const Pista = db.define('Pistas', {
    nPista:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    distPista:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    cAeropuerto: {
        type: Sequelize.STRING
    }
});

module.exports = Pista;