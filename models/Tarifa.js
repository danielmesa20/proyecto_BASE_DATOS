const Sequelize = require('sequelize');
const db = require('../config/database');
const Pasaje = require('../models/Pasaje');

const Tarifa = db.define('Tarifas', {
    pasaje:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
    },
    cEquipaje:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaCompra:{
        type: Sequelize.DATEONLY,
        allowNull: false
    }
},{
    timestamps: false
});

//Asociacion tabla Tarifas y tabla Pasajes 
Pasaje.hasOne(Tarifa, { foreignKey: 'pasaje' } );
Tarifa.belongsTo(Pasaje, { foreignKey: 'pasaje' } );

module.exports = Tarifa;
