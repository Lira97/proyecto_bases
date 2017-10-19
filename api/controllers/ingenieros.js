'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Ingeniero = require('../models/ingenieros');
var User = require('../models/users');

function getIngeniero(req, res) {//creamos la funcion para obtener un ingeniero
    var ingenieroId = req.params.id;//Creamos una variable que guarde los parámetros del body

    Ingeniero.findById(ingenieroId).populate({path: 'user'}).exec((err, ingeniero) => {//Hacemos la llamada a la base de datos por medio del la función de findById
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en la peticion"
            });
        }else {
            if(!ingeniero) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: "No existe ingeniero"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    ingeniero
                });
            }
        }
    });
}

function getIngenieros(req, res) {//creamos la funcion para obtener a los ingeniero
    var ingenieroId = req.params.user;

    if(!ingenieroId) {
        var find = Ingeniero.find({}).sort('nombre');
    }else {
        var find = Ingeniero.find({ingeniero: ingenieroId}).sort('nombre');
    }

    find.populate({path: 'user'}).exec((err, ingeniero) => {//Conectamos una colección ajena ene este caso la de users
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en la peticion"
            });
        }else {
            if(!ingeniero) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: "No existen ingeniero"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    ingeniero
                });
            }
        }
    });
}

function saveIngeniero(req, res) {//creamos la funcion para guardar nuevos ingeniero
    var ingeniero = new Ingeniero();//Creamos una variable y la igualamos a un nuevo schema
    var params = req.body;

    //regresamos lo valores del body y los igualamos a los del schema
    ingeniero.Nservicios=params.Nservicios
    ingeniero.user = params.user;

    ingeniero.save((err, ingenieroStored) => {//La respuesta es un error entonces regresa un mensaje de error

        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!ingenieroStored) {//Si lo encuentra regresa el dato solicitado
                res.status(404).send({
                    message: "No se ha guardado el ingeniero"
                });
            }else {
                res.status(200).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    ingeniero: ingenieroStored
                });
            }
        }
    });
}

function updateIngeniero(req, res) {//creamos la funcion para actualizar a un ingeniero
    var ingenieroId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    Ingeniero.findByIdAndUpdate(ingenieroId, update, (err, ingenieroUpdated) => {//buscamos el valor que deseamos
        
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en el servidor"
            });
        }else {
            if(!ingenieroUpdated) {//Si no puede actualizar el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: "No se ha actualizado el ingeniero"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    ingeniero: ingenieroUpdated
                });
            }
        }
    });
}

function deleteIngeniero(req, res) {//creamos la funcion para eliminar a un ingeniero
    var ingenieroId = req.params.id;//Creamos una variable que guarde los parámetros del body

    Ingeniero.findByIdAndRemove(ingenieroId, (err, ingenieroRemoved) => {//buscamos el valor deseado y lo eliminamos de la base
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion album'//La respuesta es un error entonces regresa un mensaje de error
            });
        }else {
            if(!ingenieroRemoved) {
                res.status(404).send({//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                    message: 'El ingeniero no se ha eliminado'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                ingeniero: ingenieroRemoved
              });
        }
      }
  });
}
module.exports = {//exportamos todos los metodos
    getIngeniero,
    saveIngeniero,
    getIngenieros,
    updateIngeniero,
    deleteIngeniero
};
