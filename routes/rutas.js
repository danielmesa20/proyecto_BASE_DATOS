const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ruta = require('../models/Ruta');
const Escala = require('../models/Escala');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LAS RUTAS
router.get('/', async  (req, res) =>  {
    let rutas = await Ruta.findAll({             
            include: [{ 
                model: Escala,
                attributes: ['pais', 'ciudad'],            
            }]   
    });
    console.log(rutas);
    res.render('ruta/rutas', {rutas} );
});

router.get('/vuelos', async  (req, res) =>  {

}); 

module.exports = router;