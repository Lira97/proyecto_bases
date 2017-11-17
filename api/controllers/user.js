'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');
var jwt = require('../services/jwt');

function saveUser(req, res) {//creamos la funcion para guardar nuevos user
    var user = new User();//Creamos una variable y la igualamos a un nuevo schema
    var params = req.body;//Creamos una variable que guarde los parámetros del body

    //regresamos lo valores del body y los igualamos a los del schema
    user.id_empleado = params.id_empleado;
    user.nombre = params.nombre;
    user.email = params.email;
    user.sueldo = params.sueldo;
    user.role = params.role;
    user.telefono = params.telefono;
    user.seguro = params.seguro;
    user.age = params.age;

    if (!user.id_empleado || !user.nombre || !user.email || !user.sueldo  || !user.role ||  !user.telefono || !user.seguro || !user.age )
    {
      return res.status(404).send({
          message: 'Los datos no puede estar vacios'
      });
    }

    if(params.password) {
        // encriptar la contraseña
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if(user.id_empleado != null && user.nombre != null && user.email != null && user.sueldo != null && user.telefono != null && user.age != null && user.seguro != null && !err) {
                // guardar usuario en bd
                user.save((err, userStored) => {
                    if(err) {
                        res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                            message: 'Error al guardar el usuario'
                        });
                    }else {
                        if(!userStored) {
                            res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                                message: 'No se pudo registrar el usuario'
                            });
                        }else {
                            res.status(200).send({//Si lo encuentra regresa el dato solicitado
                                user: userStored
                            });
                        }
                    }
                });
            }else {
                res.status(200).send({//en caso de que no se llenen todos los campos
                    message: 'Introduce todos los campos'
                });
            }
        });

    }else {
        res.status(200).send({//si no inctroduce una password
            message: 'Debe enviar password'
        });
    }
}
function getUsuario(req, res) {//creamos la funcion para obtener a las ventas

    var itemsPerPage = 100;//asignamos cuantos productos se veran por pagina

    if(req.params.page) {//usamos la paginacion de mongoose del body
        page = req.params.page;
    }else{
      var page = 1;//si no recibe el dato se le asigna uno
    }

    User.find().sort('nombre').paginate(page, itemsPerPage, function(err, user, total) {//buscamos en la base de datos y lo ordenamos por el nombre de la empresa
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!user) {//Si no encuentra el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: 'No hay artistas'
                });
            }else {
                return res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    total_items: total,
                    user: user
                });
            }
        }
    });
}
function loginUser(req, res) {
    var params = req.body;//Creamos una variable que guarde los parámetros del body
    //regresamos lo valores del body y los igualamos a los del schema
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {//buscamos el usuario
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!user) {
                res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    message: 'El usuario no existe'
                });
            }else {
                bcrypt.compare(password, user.password, (err, check) => {//si lo encuetra revisa la password
                    if(check) {
                        if(params.gethash) {
                            //devolver un token jwt
                            res.status(200).send({
                               token: jwt.createToken(user)
                            });
                        }else {
                            res.status(200).send({//regresa el usuario
                               user
                            });
                        }
                    }else {
                        res.status(400).send({//si no puede acceder
                            message: 'El usuario no se pudo acceder'
                        });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {//creamos la funcion para actualizar a un user
    var userId = req.params.id;//Creamos una variable y la igualamos a un nuevo schema
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    /*if(userId != req.user.sub) {
        return res.status(500).send({//en caso de que el token sea diferente
            message: 'No tienes permisos para actualizar este usuario'
        });
    }*/

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error al actualizar el usuario'
            });
        }else {
            if(!userUpdated) {
                res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    message: 'No se pudo actualizar el usuario'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    user: userUpdated
                });
            }
        }
    });
}
function deleteUsuario(req, res) {//creamos la funcion para eliminar a una venta
    var userID = req.params.id;//Creamos una variable que guarde los parámetros del body

    User.findByIdAndRemove(userID, (err, userRemoved) => {//La respuesta es un error entonces regresa un mensaje de error
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion '
            });
        }else {
            if(!userRemoved) {
                res.status(404).send({//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                    message: 'El venta no se ha eliminado'
                });
            }else {
              res.status(200).send({//Si lo encuentra regresa el dato solicitado
                user: userRemoved,
                });
              }
            }
        });
    }


module.exports = {//exportamos todos los metodos
    saveUser,
    loginUser,
    updateUser,
    getUsuario,
    deleteUsuario
};
