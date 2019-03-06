const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Avion = require('../models/Avion');
const Pasaje = require('../models/Pasaje');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LOS VUELOS
router.get('/', async  (req, res) =>  {
    let vuelos = await Vuelo.findAll();
    res.render('vuelo/vuelos', {vuelos} );
});

router.get('/buscarVCA', async  (req, res) =>  {

    let vuelos = await Vuelo.findAll({
        where: {
            matriculaAvion:{
                [Op.ne]: null
            }
        } 
    });
    res.render('vuelo/vuelos', {vuelos} );

});

router.get('/buscarVSA', async  (req, res) =>  {

    let vuelos = await Vuelo.findAll({
        where: {
            matriculaAvion: null,
        } 
    });
    res.render('vuelo/vuelos', {vuelos} );

});

router.get('/disp', async  (req, res) =>  {

    let datos = await Avion.findAll({  // INNER JOIN TABLE Avion Y Vuelos
        attributes: ['matriculaAvion', 'cAsientosPC','cAsientosCE',
        [Sequelize.fn('COUNT', Sequelize.col('nCedula')), 'RatingsCount'] ],        
        include: [{ 
            model: Vuelo,
            attributes: ['numeroVuelo'],
            where: { numeroVuelo: 999 },
                include: [{ 
                    model: Pasaje,
                    attributes:['nCedula', 'clase'],
                    where: { nVueloP: { [Op.ne]: null }}                             
                }]                                           
        }]
    });

    /* let datos2 = await Pasaje.findAll({
        attributes: [
            [Sequelize.fn("COUNT", Sequelize.col('nCedula')), "RatingsCount"]
        ],
        where: { nVueloP: 999 , clase: 'Economica'}
    })

    let datos3 = await Pasaje.findAll({
        attributes: [
            [Sequelize.fn("COUNT", Sequelize.col('nCedula')), "RatingsCount2"]
        ],
        where: { nVueloP: 999 , clase: 'Primera Clase'}
    }) */

    console.log(datos);
    /* console.log(datos2);
    console.log(datos3); */
    res.render('vuelo/datos', {datos});

});

module.exports = router;