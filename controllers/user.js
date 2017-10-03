'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios del api rest con Node y mongo'
    });
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.id_empleado = params.id_empleado;
    user.nombre = params.nombre;
    user.email = params.email;
    user.sueldo = params.sueldo;
    user.role = 'Administrador';
    user.telefono = params.telefono;
    user.seguro = params.seguro;
    user.age = params.age;


    if(params.password) {
        // encriptar la contraseña
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if(user.id_empleado != null && user.nombre != null && user.email != null && user.sueldo != null && user.telefono != null && user.age != null && user.seguro != null && !err) {
                // guardar usuario en bd
                user.save((err, userStored) => {
                    if(err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    }else {
                        if(!userStored) {
                            res.status(404).send({
                                message: 'No se pudo registrar el usuario'
                            });
                        }else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            }else {
                res.status(200).send({
                    message: 'Introduce todos los campos'
                });
            }
        });

    }else {
        res.status(200).send({
            message: 'Debe enviar password'
        });
    }
}
function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            }else {
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check) {
                        if(params.gethash) {
                            //devolver un token jwt
                            res.status(200).send({
                               token: jwt.createToken(user)
                            });
                        }else {
                            res.status(200).send({
                               user
                            });
                        }
                    }else {
                        res.status(400).send({
                            message: 'El usuario no se pudo acceder'
                        });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub) {
        return res.status(500).send({
            message: 'No tienes permisos para actualizar este usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        }else {
            if(!userUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar el usuario'
                });
            }else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });
}



module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser
};
