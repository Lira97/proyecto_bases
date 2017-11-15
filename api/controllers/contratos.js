'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var contratos = require('../models/contratos');


function getContrato(req, res) {//creamos la funcion para obtener un contrato
    var contratosId = req.params.id;//Creamos una variable que guarde los parámetros del body

    contratos.findById(contratosId, (err, contrato) => {//Hacemos la llamada a la base de datos por medio del la función de findById
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!contrato) {//Si no encuentra el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: 'El contrato no existe'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    contrato
                });
            }
        }
    });
}

function saveContrato(req, res) {//creamos la funcion para guardar nuevos contrato
    var contrato = new contratos();//Creamos una variable y la igualamos a un nuevo schema

    //regresamos lo valores del body y los igualamos a los del schema
    var params = req.body;
    contrato.id_contrato = params.id_contrato;
    contrato.nombreEmpresa = params.nombreEmpresa;
    contrato.valor = params.valor;
    contrato.zona = params.zona;
    contrato.telefono = params.telefono;
    contrato.servicios = params.servicios;

    contrato.save((err, contratoStored) => {//La respuesta es un error entonces regresa un mensaje de error
        if(err) {
            res.status(500).send({
                message: 'Error al guardar el producto'
            });
        }else {
            if(contratoStored) {//Si lo encuentra regresa el dato solicitado
                res.status(200).send({
                    contrato: contratoStored
                });
            }else {
                res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    message: 'El contrato no se pudo guardar'
                });
            }
        }
    });
}

function getContratos(req, res) {//creamos la funcion para obtener a los contratos

    if(req.params.page) {//usamos la paginacion de mongoose del body
        page = req.params.page;
    }else{
      var page = 1;//si no recibe el dato se le asigna uno
    }
    var itemsPerPage = 100;//asignamos cuantos productos se veran por pagina
    contratos.find().sort('nombreEmpresa').paginate(page, itemsPerPage, function(err, contratos, total) {//buscamos en la base de datos y lo ordenamos por el nombre de la empresa
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!contratos) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: 'No hay contratos'
                });
            }else {
                return res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    total_items: total,
                    contratos: contratos
                });
            }
        }
    });
}

function updateContrato(req, res) {//creamos la funcion para actualizar a un contrato
    var contratoId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    contratos.findByIdAndUpdate(contratoId, update, (err, contratoUpdated) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!contratoUpdated) {
                res.status(404).send({//Si no puede actualizar el dato en la base de datos regresa un mensaje de error
                    message: 'El contrato no ha sido actualizado'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    contrato: contratoUpdated
                });
            }
        }
    });
}

function deleteContrato(req, res) {//creamos la funcion para eliminar a un contrato
    var contratoId = req.params.id;//Creamos una variable que guarde los parámetros del body

    contratos.findByIdAndRemove(contratoId, (err, contratoRemoved) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!contratoRemoved) {
                res.status(404).send({//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                    message: 'El contrato no se ha eliminado'
                });
            }else {
              res.status(200).send({//Si lo encuentra regresa el dato solicitado
                contrato: contratoRemoved,
                });
              }
            }
        });
    }

module.exports = {//exportamos todos los metodos
    getContrato,
    saveContrato,
    getContratos,
    updateContrato,
    deleteContrato
};
