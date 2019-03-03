const Sequelize = require('sequelize');
const db = require('../config/database');

const Avion = db.define('Aviones', {
    matriculaAvion:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false
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
    cMaxEquipaje:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    cMaxCabina:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cTelevisores:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dispInternet:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dispEquipoMedico:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    asientosPC:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    asientosCE:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cSalidas:{
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

module.exports = Avion;