const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');
const Pista = require('../models/Pista');
const Pasaje = require('../models/Pasaje');
const Pasajero = require('../models/Pasajero');
const Telefono = require('../models/Telefono');
const Tarifa = require('../models/Tarifa');
const Ruta = require('../models/Ruta');
const Escala = require('../models/Escala');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LOS AEROPUERTOS

router.get('/', async  (req, res) =>  {
    let aeropuertos = await Aeropuerto.findAll();
    res.render('aeropuerto/aeropuertos', {aeropuertos} );
}); 

router.get('/pistas/:dato', async  (req, res) =>  {         // Buscar las pistas de un aeropuerto
    const { dato } = req.params;
    let aeropuertos = await Aeropuerto.findAll({
        attributes: ['IATA', 'nombre'],                     // Datos a traer de la tabla Aeropuertos
        where: {IATA: dato},
        include: [{ 
            model: Pista,
            attributes: ['nPista', 'distPista'],            // Datos a traer de la tabla Pistas
            require: true                                   // INNER JOIN TABLE AEROPUERTO Y PISTAS
        }]
    });
    console.log(aeropuertos);
    res.render('aeropuerto/aeropuertos-pistas', {aeropuertos} );
});

router.get('/prueba', async  (req, res) =>  {
    let aeropuertos = await Ruta.findAll({
        include: [{ 
            model: Escala,
            required: true                                  
        }]
    });
    console.log(aeropuertos)
    res.render('aeropuerto/aeropuertos', {aeropuertos} );
}); 

module.exports = router;