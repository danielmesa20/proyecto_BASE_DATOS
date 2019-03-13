const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const User = require('../models/Auth'); //Load auth model

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' } , (email, password, done ) => {
            //Match email
            User.findOne(
                { where: { email }
            }).then(user =>{
                if(!user){                                  //Verifica que el correo ingersado esté registrado
                    console.log("no registrado");
                    return done(null, false, "hola");
                }
                console.log("Si correo");
                bcrypt.compare(password, user.password, (err, isMatch) => { //Verifica si la contraseña coincide
                    if(err) throw err;
                    if(isMatch){
                        console.log("Si contraseña");
                        return done(null, user);
                    }else{
                        console.log("no contraseña");
                        return done(null, false, "ull")
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });

};