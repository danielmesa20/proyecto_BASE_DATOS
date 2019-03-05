const Sequelize = require('sequelize');
const db = require('../config/database');
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
    fechaRealLLegada:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    fechaRealLLegada:{
        type: Sequelize.DATE,
        allowNull: true 
    },
    matriculaAvion:{
        type: Sequelize.STRING,
        references: {
            model: Avion,
            key: "matriculaAvion"
        }
    }
});
Vuelo.hasOne(Avion, { foreignKey: 'matriculaAvion' } );
module.exports = Vuelo;