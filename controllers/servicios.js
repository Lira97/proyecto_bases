'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var ventas = require('../models/servicios');
var user = require('../models/user');


function getServicio(req, res) {
    var ventasId = req.params.id;

    ventas.findById(ventasId, (err, venta) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!venta) {
                res.status(404).send({
                    message: 'El producto no existe'
                });
            }else {
                res.status(200).send({
                    venta
                });
            }
        }
    });
}

function saveServicio(req, res) {
    var venta = new ventas();

    var params = req.body;
    venta.id_contrato = params.id_contrato;
    venta.nombreEmpresa = params.nombreEmpresa;
    venta.valor = params.valor;
    venta.zona = params.zona;
    venta.telefono = params.telefono;
    venta.servicios = params.servicios;

    ventas.save((err, ventaStored) => {
        if(err) {
            res.status(500).send({
                message: 'Error al guardar el producto'
            });
        }else {
            if(ventaStored) {
                res.status(200).send({
                    venta: ventaStored
                });
            }else {
                res.status(404).send({
                    message: 'El producto no se pudo guardar'
                });
            }
        }
    });
}

function getServicios(req, res) {
    var page = 1;
    var itemsPerPage = 3;

    if(req.params.page) {
        page = req.params.page;
    }

    ventas.find().sort('Nventa').paginate(page, itemsPerPage, function(err, ventas, total) {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!ventas) {
                res.status(404).send({
                    message: 'No hay artistas'
                });
            }else {
                return res.status(200).send({
                    total_items: total,
                    ventas: ventas
                });
            }
        }
    });
}

function updateServicio(req, res) {
    var ventasId = req.params.id;
    var update = req.body;

    ventas.findByIdAndUpdate(ventasId, update, (err, ventaUpdated) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!ventaUpdated) {
                res.status(404).send({
                    message: 'El artista no ha sido actualizado'
                });
            }else {
                res.status(200).send({
                    venta: ventaUpdated
                });
            }
        }
    });
}

function deleteServicio(req, res) {
    var ventasID = req.params.id;

    ventas.findByIdAndRemove(ventasID, (err, ventaRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion artista'
            });
        }else {
            if(!ventaRemoved) {
                res.status(404).send({
                    message: 'El artista no se ha eliminado'
                });
            }else {
              res.status(200).send({
                venta: ventaRemoved,
                });
              }
            }
        });
    }

module.exports = {
    getServicio,
    saveServicio,
    getServicios,
    updateServicio,
    deleteServicio
};
