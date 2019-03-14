const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ruta = require('../models/Ruta');
const Escala = require('../models/Escala');
const AvionRuta = require('../models/AvionRuta');
const Avion = require('../models/Avion');
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

//Editar ruta
router.get('/edit/:nRuta', async (req,res) =>{  // Muestra los datos del avión a editar
    const { nRuta } = req.params;
    let ruta = await Ruta.findAll({ 
        attributes:['nRuta', 'origen', 'destino', 'pBase'],
            include:[{
                model:Escala,
                attributes:['ciudad','pais'],
            }],
        where: { nRuta }
    });
    console.log(ruta);
    res.render('ruta/edit', { ruta } );
});

 router.post('/edit/:nRuta', async (req,res) =>{
    const { nRuta } = req.params;
    const { origen, destino, pBase, escalapais, escalaciudad } = req.body;
    let errors = [];
    
    let verificar = await Ruta.findAll({
        include:[{
             model: Escala,
             where: { pais: escalapais, ciudad: escalaciudad  } 
        }],
        where: { origen, destino, nRuta:{ [Op.ne]: nRuta} }
    });

    console.log(verificar);
    
    if(Object.entries(verificar).length > 0){
        errors.push({text: 'Los datos ingresados ya pertenecen a otra ruta'})
        res.render('ruta/add', { errors, origen, destino, nRuta, escalaciudad, escalapais})
    }else{

    }
    /* const newAvion = {
        origen,
        destino,
        pBase
    }
    await Avion.update( newAvion, { 
        where:{ matriculaAvion } 
    });
    req.flash('success', 'Se cambio el estado del avion correctamente');
    res.redirect('/aviones')  */
 });

 //Mostrar aviones por ruta
 router.get('/avionesA', async (req,res) =>{  // Muestra los datos del avión a editar
     let ruta = await Ruta.findAll({ 
         attributes:['nRuta','origen','destino'],
             include:[
                 {
                    model:AvionRuta,
                    attributes:['id'],
                    required:true,
                        include:[{
                            model:Avion,
                            attributes:['matriculaAvion'],
                            required:true
                        }]
                 }
            ],
     });
     console.log(ruta);
     res.render('ruta/avionesA', { ruta } );
 });
 


module.exports = router;