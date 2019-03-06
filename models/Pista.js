const Sequelize = require('sequelize');
const db = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');

const Pista = db.define('Pistas', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    distPista:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    AeropuertoIATA: {
        type: Sequelize.STRING,
        references: {
            model: Aeropuerto,
            key: "IATA"
        }
    }
});

module.exports = Pista;