const Sequelize = require('sequelize');
const db = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');

const Pista = db.define('Pistas', {
    nPista:{
        type: Sequelize.INTEGER,
        allowNull: false
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

//Pista.belongsTo(Aeropuerto);

module.exports = Pista;