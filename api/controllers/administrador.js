'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Administrador = require('../models/administrador');
var User = require('../models/users');

function getAdministrador(req, res) {//creamos la funcion para obtener un administrador
    var administradorId = req.params.id;//Creamos una variable que guarde los parámetros del body

    Administrador.findById(administradorId).populate({path: 'user'}).exec((err, administrador) => {//Hacemos la llamada a la base de datos por medio del la función de findById

        if(err) {//La respuesta es un error entonces regresa un mensaje de error
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!administrador) {//Si no encuentra el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: "No existe administrador"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    administrador
                });
            }
        }
    });
}

function getAdministradores(req, res) {//creamos la funcion para obtener a los administradores
    var administradorId = req.params.user;//Creamos una variable que guarde los parámetros del body

    if(!administradorId) {
        var find = Administrador.find({}).sort('nombre');
    }else {
        var find = Administrador.find({administrador: administradorId}).sort('nombre');
    }

    find.populate({path: 'user'}).exec((err, albums) => {//Conectamos una colección ajena ene este caso la de users
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en la peticion"
            });
        }else {
            if(!administrador) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: "No existen administrador"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    administrador
                });
            }
        }
    });
}

function saveAdministrador(req, res) {//creamos la funcion para guardar nuevos administrador
    var administrador = new Administrador();//Creamos una variable y la igualamos a un nuevo schema
    var params = req.body;//Creamos una variable que guarde los parámetros del body

    administrador.user = params.user;//regresamos lo valores del body y los igualamos a los del schema

    administrador.save((err, administradorStored) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en el servidor"
            });
        }else {
            if(!administradorStored) {//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: "No se ha guardado el administrador"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    administrador: administradorStored
                });
            }
        }
    });
}

function updateAdministrador(req, res) {//creamos la funcion para actualizar a un administrador
    var administradorId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    Album.findByIdAndUpdate(administradorId, update, (err, administradorUpdated) => {//buscamos el valor que deseamos actualizar
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en el servidor"
            });
        }else {
            if(!administradorUpdated) {//Si no puede actualizar el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: "No se ha actualizado el administrador"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    administrador: administradorUpdated
                });
            }
        }
    });
}

function deleteAdministrador(req, res) {//creamos la funcion para eliminar a un administrador
    var administradorId = req.params.id;//Creamos una variable que guarde los parámetros del body

    Album.findByIdAndRemove(administradorId, (err, administradorRemoved) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!administradorRemoved) {//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: 'El administrador no se ha eliminado'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                administrador: administradorRemoved
            });
        }
      }
  });
}
module.exports = {//exportamos todos los metodos
    getAdministrador,
    saveAdministrador,
    getAdministradores,
    updateAdministrador,
    deleteAdministrador
};
