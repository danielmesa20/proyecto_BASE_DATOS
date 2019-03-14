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

router.get('/addPista', async  (req, res) =>  {
    let aeropuertos = await Aeropuerto.findAll({
        attributes:['IATA']
    });
    console.log(aeropuertos)
    res.render('aeropuerto/addPista', {aeropuertos} );
}); 

router.post('/addPista', async  (req, res) =>  {              // INNER JOIN tabla Vuelos, tabla Rutas
    const  { IATA, distPista } = req.body;
    let errors = []; 
    if(distPista <= 0 ){
        errors.push({text: 'Ingrese valores mayores a 0'});
    }if(errors.length>0){
        res.render('aeropuerto/addPista', { errors, IATA, distPista } );
    }else{
        const pista = await Pista.build({   //Insert into table Aviones
            distPista, cAeropuerto: IATA
        });
        await pista.save();
        res.redirect('/aeropuertos'); 
    }
});

router.post('/addPista', async  (req, res) =>  {              // INNER JOIN tabla Vuelos, tabla Rutas
    const  { IATA, distPista } = req.body;
    let errors = []; 
    if(distPista <= 0 ){
        errors.push({text: 'Ingrese valores mayores a 0'});
    }if(errors.length>0){
        res.render('aeropuerto/addPista', { errors, IATA, distPista } );
    }else{
        const pista = await Pista.build({   //Insert into table Aviones
            distPista, cAeropuerto: IATA
        });
        await pista.save();
        res.redirect('/aeropuertos'); 
    }
});

router.get('/addAeropuerto', async  (req, res) =>  {
    res.render('aeropuerto/addAeropuerto');
}); 

router.post('/addAeropuerto', async  (req, res) =>  {              
    const  { IATA, pais, ciudad, nombre } = req.body;
    let errors = []; 
    let prueba = await Aeropuerto.findOne({
        where: { IATA } 
    });
    if(prueba != null){
        errors.push({text: 'El codigo IATA ingresado ya está registrado'});
        res.render('aeropuerto/addAeropuerto', { errors, IATA, pais, ciudad, nombre } );
    }else{
        const dato = await Aeropuerto.build({         //Insert into table Aeropuertos
            nombre, IATA, ciudad, pais
        });
        await dato.save();
        res.redirect('/aeropuertos'); 
    }
});



module.exports = router;