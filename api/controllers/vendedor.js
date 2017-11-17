'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Vendedor = require('../models/vendedor');
var User = require('../models/users');

function getVendedor(req, res) {//creamos la funcion para obtener un vendedor
    var vendedorId = req.params.id;//Creamos una variable que guarde los parámetros del body

    Vendedor.findById(vendedorId).populate({path: 'user'}).exec((err, vendedor) => {//Hacemos la llamada a la base de datos por medio del la función de findById
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en la peticion"
            });
        }else {
            if(!vendedor) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: "No existe vendedor"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    vendedor
                });
            }
        }
    });
}

function getVendedores(req, res) {//creamos la funcion para obtener a los vendedores
    var vendedorId = req.params.user;//Creamos una variable que guarde los parámetros del body

    if(!vendedorId) {
        var find = Vendedor.find({}).sort('nombre');
    }else {
        var find = Vendedor.find({vendedor: vendedorId}).sort('nombre');
    }

    find.populate({path: 'user'}).exec((err, vendedor) => {//Conectamos una colección ajena ene este caso la de users
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en la peticion"
            });
        }else {
            if(!vendedor) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: "No existen vendedor"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    vendedor
                });
            }
        }
    });
}

function saveVendedor(req, res) {//creamos la funcion para guardar nuevos vendedor
    var vendedor = new Vendedor();//Creamos una variable y la igualamos a un nuevo schema
    var params = req.body;//Creamos una variable que guarde los parámetros del body

    //regresamos lo valores del body y los igualamos a los del schema
    vendedor.Nclientes=params.Nclientes
    vendedor.user = params.user;
    if (!vendedor.Nclientes || !vendedor.user )
    {
      return res.status(404).send({
          message: 'Los datos no puede estar vacios'
      });
    }
    vendedor.save((err, vendedorStored) => {//La respuesta es un error entonces regresa un mensaje de error
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!vendedorStored) {
                res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    message: "No se ha guardado el vendedor"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    vendedor: vendedorStored
                });
            }
        }
    });
}

function updateVendedor(req, res) {//creamos la funcion para actualizar a un vendedor
    var vendedorId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    Vendedor.findByIdAndUpdate(vendedorId, update, (err, vendedorUpdated) => {//buscamos el valor que deseamos actualizar
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: "Error en el servidor"
            });
        }else {
            if(!vendedorUpdated) {
                res.status(404).send({//Si no puede actualizar el dato en la base de datos regresa un mensaje de error
                    message: "No se ha actualizado el vendedor"
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    vendedor: vendedorUpdated
                });
            }
        }
    });
}

function deleteVendedor(req, res) {//creamos la funcion para eliminar a un vendedor
    var vendedorId = req.params.id;//Creamos una variable que guarde los parámetros del body

    Vendedor.findByIdAndRemove(vendedorId, (err, vendedorRemoved) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!vendedorRemoved) {//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: 'El vendedor no se ha eliminado'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                vendedor: vendedorRemoved
              });
        }
      }
  });
}
module.exports = {//exportamos todos los metodos
    getVendedor,
    saveVendedor,
    getVendedores,
    updateVendedor,
    deleteVendedor
};
