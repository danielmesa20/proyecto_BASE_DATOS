const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Avion = require('../models/Avion');
const Ruta = require('../models/Ruta');
const Pasaje = require('../models/Pasaje');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//VUELOS
router.get('/', async  (req, res) =>  { //INNER JOIN TABLE VUELOS Y TABLE RUTAS
    let datos = await Avion.findAll({
        attributes: ['cAsientosCE', 'cAsientosPC'],
        include: [{ 
            model: Vuelo,
            attributes: ['numeroVuelo', 'fechaSalida', 'fechaLlegada'], //atributos tabla Vuelos
            required: true, 
                include: [{ 
                    model: Ruta,
                    attributes: ['destino', 'origen'], //atributos tabla Rutas
                    required: true         
                }]       
        }],
    });
    console.log(datos);
    res.render('vuelo/vuelos', {datos} );
});

router.get('/datos/:dato', async  (req, res) =>  {
    const { dato } = req.params;
    let datos = await Pasaje.findAll({
        attributes: ['nPasaje', 'clase'], //atributos tabla Rutas
        where:{ nVuelo: dato }
    });
    console.log(datos);
    res.render('vuelo/datos', {datos, dato} );

});

router.get('/buscarVSA', async  (req, res) =>  {

    let datos = await Vuelo.findAll({
        where: {
            mAvion: null,
        } 
    });
    res.render('vuelo/datos', {vuelos} );

});

router.get('/disp', async  (req, res) =>  { //Cantidad de asientos disponibles por vuelos

    const datos = await Pasaje.count({
        where: { nVueloP: 999 }
    })
    console.log(datos);
});

module.exports = router;