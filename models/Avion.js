const Sequelize = require('sequelize');
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');

const Avion = db.define('Aviones', {
    matriculaAvion:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    estadoAvion:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nVuelo:{
        type: Sequelize.INTEGER,
    },
    vMaxima:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vCruzero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fabricante:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cargMaxE:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    cargMaxC:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cantTel:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dispInternet:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dispEMedico:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cAsientosPC:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cAsientosCE:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nSalidas:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    distDespegue:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    cCombustible:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    cTripulacion:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eliminado:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Avion.belongsTo(Vuelo,{foreignKey: 'nVuelo'});

module.exports = Avion;