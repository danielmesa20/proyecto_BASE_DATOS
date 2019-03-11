const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Avion = require('../models/Avion');
const Ruta = require('../models/Ruta');
const Pasaje = require('../models/Pasaje');
const Pasajero = require('../models/Pasajero');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//VUELOS
router.get('/', async  (req, res) =>  { //INNER JOIN TABLE VUELOS , AVION  Y RUTAS
        let datos = await Vuelo.findAll({
            attributes: ['numeroVuelo', 'fechaSalida', 'fechaLlegada'], //atributos tabla Vuelos
            include: [
                {
                    model: Ruta,
                    attributes: ['destino', 'origen'], //atributos tabla Rutas
                    required:true        
                },
                {
                    model: Avion,
                    attributes: ['cAsientosCE', 'cAsientosPC'], //atributos tabla Aviones 
                    required:true      
                }
            ]
        });
        
        console.log(datos);

        res.render('vuelo/vuelos', {datos} );
});

router.get('/datos/:dato', async  (req, res) =>  {
    const { dato } = req.params;
    let datos = await Pasaje.findAll({              //INNER JOIN table Pasajes y tabla Pasajeros
        attributes: ['nPasaje', 'clase'],           //atributos tabla Pasaje
         where:{ nVuelo: dato },
            include: [{ 
                model: Pasajero,
                attributes: ['nombre', 'direccion'], //atributos tabla Pasajero
                required: true         
            }]   
    });
    console.log(datos);
    res.render('vuelo/datos', {datos} );

});

router.get('/buscarVSA', async  (req, res) =>  {
    let datos = await Pasaje.findAll({
        include: [{ 
            model: Pasajero,
            required: true
        }]
    });

    console.log(datos);
    res.render('vuelo/vuelos', {datos} );
});

router.get('/disp', async  (req, res) =>  { //Cantidad de asientos disponibles por vuelos


    
});

module.exports = router;