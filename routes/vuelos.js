const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Avion = require('../models/Avion');
const Ruta = require('../models/Ruta');
const Pasaje = require('../models/Pasaje');
const Pasajero = require('../models/Pasajero');
const Escala = require('../models/Escala');
const Aeropuerto = require('../models/Aeropuerto');
const AvionRuta = require('../models/AvionRuta');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//MOSTRAR TODOS LOS VUELOS
router.get('/', async  (req, res) =>  {                                 // INNER JOIN TABLE VUELOS , AVION  Y RUTAS
        let datos = await Vuelo.findAll({
            attributes: ['numeroVuelo', 'fechaSalida', 'fechaLlegada'], // Atributos tabla Vuelos
            include: [
                {
                    model: AvionRuta,
                    required:true,
                        include: [
                            {
                                model: Ruta,
                                attributes: ['destino', 'origen'],                    
                                required:true,
                                    include: [
                                        {
                                            model: Escala,
                                            attributes: ['pais', 'ciudad'],                  
                                            required:true      
                                        }
                                    ],
                            },
 			                {
                                model: Avion,
                                attributes: ['cAsientosCE', 'cAsientosPC'],         
                                required:true      
                            }
                        ],       
                },
             ]
        });
        console.log(datos);
        res.render('vuelo/vuelos', {datos} );
});

//MOSTRAR PASAJEROS DE UN VUELO
router.get('/datos/:dato', async  (req, res) =>  {      // INNER JOIN table Pasajes y tabla Pasajeros
    const { dato } = req.params;
    let datos = await Pasaje.findAll({                  
        attributes: ['nPasaje', 'clase'],               // Atributos tabla Pasajes
         where:{ nVuelo: dato },
            include: [{ 
                model: Pasajero,
                attributes: ['nombre', 'direccion'],    // Atributos tabla Pasajeros
                required: true         
            }]   
    });
    console.log(datos);
    res.render('vuelo/datos', {datos} );

});

//BUSCAR UN VUELO
router.get('/buscar', async (req,res) =>  {                 
    let rutas = await Ruta.findAll();
    res.render('vuelo/buscar', { rutas } );
});
      
router.post('/buscar', async  (req, res) =>  {              // INNER JOIN tabla Vuelos, tabla Rutas
    const  { origen, destino, dateS, dateL } = req.body;
    let errors = []; // Vector de errores
    if(origen == destino){
        errors.push({text: 'El destino debe ser distinto al origen'});
    }if(dateS == dateL){
        errors.push({text: 'La fecha de llegada no puede ser igual a la fecha de salida'});
    }if(errors.length>0){
        res.render('vuelo/buscar', { errors, origen, destino } );
    }else{
        let datos = await Vuelo.findAll({
            where:{ fechaSalida: dateS, fechaLlegada: dateL },
            include: [{ 
                model: AvionesRutas,
                where: { origen: origen, destino: destino },
                required: true,
                    include: [
                        {
                            model: Escala,
                            attributes: ['pais', 'ciudad'],                  // Atributos tabla Escalas
                            required:true      
                        }
                    ],      
            }]
        });
        console.log(datos); 
        if(datos.length>0){                                             // Si hay vuelos con esas especificaciones
            res.render('vuelo/mostrar', {datos} ); 
        }else{
            errors.push({text: 'No hay vuelos con esas especificaciones! '} );
            res.render('vuelo/buscar', { errors, origen, destino } ); 
        }
    }
});

//COMPRAR UN PASAJE
router.get('/comprar/:dato', async  (req, res) =>  { 
    const { dato } = req.params;
    let datoVuelo = await Vuelo.findOne({
        where:{ numeroVuelo: dato }
    });
    console.log(datoVuelo);
    res.render('vuelo/comprar', { datoVuelo });
});

//PLANIFICAR VUELO
router.get('/crear', async (req,res) =>  {  // LEFT JOIN Tabla Rutas y tabla Escalas
    let rutas = await Ruta.findAll({
        attributes: ['nRuta','destino', 'origen', 'dist'],
        include: [
            { 
                model: Escala,
                attributes: ['pais', 'ciudad'],     
            }
        ]   
    })

    let aviones = await Avion.findAll({
        attributes: ['matriculaAvion','distDespegue']
    });

    console.log(rutas);
    res.render('vuelo/crear', { rutas, aviones } );
}); 

router.post('/crear', async  (req, res) =>  {                         
    const  { ruta, dateS, dateL } = req.body;

    let n = ' ';
    let p = false;

    for(var i=0; i < ruta.length; i++){
        if(ruta[i] != '-' && p == false){
            n = n + ruta[i];
        }else{
            p=true;
        } 
    }
  
});

module.exports = router;