const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Avion = require('../models/Avion');
const Ruta = require('../models/Ruta');
const Escala = require('../models/Escala');
const AvionRuta = require('../models/AvionRuta');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//GET aviones list (localhost:8080/aviones)

//Mostrar todos los aviones
router.get('/', async  (req, res) =>  {
    let aviones = await Avion.findAll({
        where: { eliminado: 0 }
    });
    res.render('avion/aviones', {aviones} );
});

//Mostrar un form para añadir un avión
router.get('/add', (req,res) => res.render('avion/add'));  

// Add un avion
router.post('/add', async (req,res) =>  {     
    
    let { matriculaAvion , estado , vMaxima, vCruzero, fabricante,cargMaxE, modelo,  
    cantTel, cargMaxC, dispInternet,dispEMedico, cAsientosPC, cAsientosCE,
    cCombustible, nSalidas, distDespegue, cTripulacion } = req.body;

    let errors = []; // Vector de errores

    //VERIFICAR SI UN CAMPO ESTA VACIO
    if(!matriculaAvion || !estado || !vMaxima || !vCruzero 
        || !fabricante || !cargMaxE  || !modelo || !cantTel || !cargMaxC 
        || !dispInternet || !dispEMedico || !cAsientosPC || !cAsientosCE || !cCombustible 
        || !nSalidas  || !distDespegue || !cTripulacion){
        errors.push({text: 'Por favor rellena todos los campos'})
    }
    if(vMaxima <= 0 || vCruzero <= 0  || cargMaxE < 0 || cantTel < 0 
        || cAsientosPC < 0 || cAsientosCE < 0 || cCombustible < 0 || nSalidas < 0 ||
        distDespegue < 0 || cargMaxC < 0 || cTripulacion <= 0){
        errors.push({text: 'Por favor ingrese valores mayores a 0'})
    }
    //Check for errores
    if(errors.length>0){
        res.render('avion/add', {
            errors, matriculaAvion, estado, vMaxima, vCruzero, fabricante, cargMaxE, modelo, 
            cantTel,cargMaxC,dispInternet,dispEMedico,cAsientosPC,cAsientosCE,cCombustible,
            nSalidas,  distDespegue , cTripulacion
        })
    }else{ //Si no hay errores
        let aux, aux2;
        if(dispInternet == 'SI'){
            aux=1;
        }else{
            aux=0;
        }if(dispEMedico == 'SI'){
            aux2=1;
        }else{
            aux2=0;
        }
        //Buscar si esa matricula de avion ya está registrada
        let error = await Avion.findAll({
            where: { matriculaAvion }
        });
        if(Object.entries(error).length > 0){
            console.log("hola");
            errors.push({text: 'Esa matricula de avión ya se encuentra registrada'})
            res.render('avion/add', {
                errors, matriculaAvion, estado, vMaxima, vCruzero, fabricante, cargMaxE, modelo, 
                cantTel,cargMaxC,dispInternet,dispEMedico,cAsientosPC,cAsientosCE,cCombustible,
                nSalidas,  distDespegue , cTripulacion
            })
        }else{
            const avion = await Avion.build({   //Insert into table Aviones
                matriculaAvion, estado, vMaxima, vCruzero, fabricante, cargMaxE, modelo, cantTel,
                cargMaxC, cAsientosPC, cAsientosCE, cCombustible, nSalidas, distDespegue,
                cTripulacion, dispInternet: aux, dispEMedico: aux2, eliminado: 0
            });
            await avion.save();
            return res.redirect('/aviones'); 
        }
    }
});

//Buscar un avion por su número
router.get('/buscar', (req,res) =>  res.render('avion/buscar'));  

router.post('/buscar', async (req, res) => {
    const  { matriculaAvion } = req.body;
    let aviones = await Avion.findAll({ 
        where: { matriculaAvion , eliminado:0 } 
    });
    if(Object.entries(aviones).length > 0){
        res.render('avion/buscarA', { aviones } );
    }
});

//ELIMINAR AVION
router.get('/delete/:matriculaAvion', async (req,res) =>{
    const { matriculaAvion } = req.params;  
    const newData = { eliminado: 1 }
   
    await Avion.update(newData, { 
        where:{ matriculaAvion } 
    })

    res.redirect('/aviones') 
 });

//Editar avión
router.get('/edit/:matriculaAvion', async (req,res) =>{  // Muestra los datos del avión a editar
    const { matriculaAvion } = req.params;
    let avion = await Avion.findAll({ 
        attributes:['matriculaAvion', 'estado'],
        where: { matriculaAvion }
    });
    res.render('avion/edit', { avion });
});

 router.post('/edit/:matriculaAvion', async (req,res) =>{
    const { matriculaAvion } = req.params;
    const { estado } = req.body;
    const newAvion = {
        estado
    }
    await Avion.update( newAvion, { 
        where:{ matriculaAvion } 
    });
    res.redirect('/aviones')
 });

 router.get('/asignarRuta', async (req,res) =>{ 
    let aviones = await Avion.findAll({ 
        attributes:['matriculaAvion']
    });

    let rutas = await Ruta.findAll({ 
        attributes:['nRuta', 'origen', 'destino'],
        include:[{
            model:Escala,
            attributes:['pais','ciudad']
        }]
    });
    console.log(rutas);
    res.render('avion/asignarRuta', { aviones, rutas } );
});

router.post('/asignarRuta', async  (req, res) =>  {  

    const  {ruta, avion } = req.body;
    let errors = [];

    let n = ' '; let p = false;

    for(var i=0; i < ruta.length; i++){
        if(ruta[i] != '-' && p == false)
            n = n + ruta[i];
        else
            p=true;
    }
    
    let verificar = await  AvionRuta.findAll({
        where:{ ruta: n, mAvion: avion }
    });

    console.log(verificar);

    if(verificar){
        errors.push({text: 'Esa ruta ya esta asignada a ese avión'});
        res.redirect('/aviones/asignarRuta');
    }else{
        const dato = await AvionRuta.build({   //Insert into table
            mAvion: avion,
            ruta: n
        });
        await dato.save(); 
        res.redirect('/aviones/asignarRuta');     
    }
});

module.exports = router;
