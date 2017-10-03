'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var contratos = require('../models/contratos');


function getContrato(req, res) {
    var contratosId = req.params.id;

    contratos.findById(contratosId, (err, contrato) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!contrato) {
                res.status(404).send({
                    message: 'El producto no existe'
                });
            }else {
                res.status(200).send({
                    contrato
                });
            }
        }
    });
}

function saveContrato(req, res) {
    var contrato = new contratos();

    var params = req.body;
    contrato.id_contrato = params.id_contrato;
    contrato.nombreEmpresa = params.nombreEmpresa;
    contrato.valor = params.valor;
    contrato.zona = params.zona;
    contrato.telefono = params.telefono;
    contrato.servicios = params.servicios;

    contrato.save((err, contratoStored) => {
        if(err) {
            res.status(500).send({
                message: 'Error al guardar el producto'
            });
        }else {
            if(contratoStored) {
                res.status(200).send({
                    contrato: contratoStored
                });
            }else {
                res.status(404).send({
                    message: 'El producto no se pudo guardar'
                });
            }
        }
    });
}

function getContratos(req, res) {
    var page = 1;
    var itemsPerPage = 3;

    if(req.params.page) {
        page = req.params.page;
    }

    contratos.find().sort('nombreEmpresa').paginate(page, itemsPerPage, function(err, contratos, total) {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!contratos) {
                res.status(404).send({
                    message: 'No hay artistas'
                });
            }else {
                return res.status(200).send({
                    total_items: total,
                    contratos: contratos
                });
            }
        }
    });
}

function updateContrato(req, res) {
    var contratoId = req.params.id;
    var update = req.body;

    contratos.findByIdAndUpdate(contratoId, update, (err, contratoUpdated) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!contratoUpdated) {
                res.status(404).send({
                    message: 'El artista no ha sido actualizado'
                });
            }else {
                res.status(200).send({
                    contrato: contratoUpdated
                });
            }
        }
    });
}

function deleteContrato(req, res) {
    var contratoId = req.params.id;

    contratos.findByIdAndRemove(contratoId, (err, contratoRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion artista'
            });
        }else {
            if(!contratoRemoved) {
                res.status(404).send({
                    message: 'El artista no se ha eliminado'
                });
            }else {
              res.status(200).send({
                contrato: contratoRemoved,
                });
              }
            }
        });
    }

module.exports = {
    getContrato,
    saveContrato,
    getContratos,
    updateContrato,
    deleteContrato
};
