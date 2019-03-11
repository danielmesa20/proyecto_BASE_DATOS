const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');
const Pista = require('../models/Pista');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LOS AEROPUERTOS

router.get('/', async  (req, res) =>  {
    let aeropuertos = await Aeropuerto.findAll();
    console.log(aeropuertos);
    res.render('aeropuerto/aeropuertos', {aeropuertos} );
}); 

router.get('/pistas/:dato', async  (req, res) =>  { //buscar las pistas de un aeropuerto
    const { dato } = req.params;
    let aeropuertos = await Aeropuerto.findAll({
        attributes: ['IATA', 'nombre'],                     //datos a traer de la tabla Aeropuertos
        where: {IATA: dato},
        include: [{ 
            model: Pista,
            attributes: ['nPista', 'distPista'],                // datos a traer de la tabla pistas
            require: true                                   // INNER JOIN TABLE AEROPUERTO Y PISTAS
        }]
    });
    console.log(aeropuertos);
    res.render('aeropuerto/aeropuertos-pistas', {aeropuertos} );
});

router.get('/prueba', async  (req, res) =>  {
    let aeropuertos = await Pista.findAll({
        include: [{ 
            model: Aeropuerto,
            require: true                                  
        }]
    });
    console.log(aeropuertos)
    res.render('aeropuerto/aeropuertos', {aeropuertos} );
}); 

module.exports = router;