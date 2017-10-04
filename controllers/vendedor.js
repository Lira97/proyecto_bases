'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Vendedor = require('../models/vendedor');
var User = require('../models/users');

function getVendedor(req, res) {
    var vendedorId = req.params.id;

    Vendedor.findById(vendedorId).populate({path: 'user'}).exec((err, vendedor) => {
        if(err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!vendedor) {
                res.status(404).send({
                    message: "No existe album"
                });
            }else {
                res.status(200).send({
                    vendedor
                });
            }
        }
    });
}

function getVendedores(req, res) {
    var vendedorId = req.params.user;

    if(!vendedorId) {
        var find = Vendedor.find({}).sort('nombre');
    }else {
        var find = Vendedor.find({vendedor: vendedorId}).sort('nombre');
    }

    find.populate({path: 'user'}).exec((err, vendedor) => {
        if(err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!vendedor) {
                res.status(404).send({
                    message: "No existen albums"
                });
            }else {
                res.status(200).send({
                    vendedor
                });
            }
        }
    });
}

function saveVendedor(req, res) {
    var vendedor = new Vendedor();
    var params = req.body;

    vendedor.Nclientes=params.Nclientes
    vendedor.user = params.user;

    vendedor.save((err, vendedorStored) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!vendedorStored) {
                res.status(404).send({
                    message: "No se ha guardado el album"
                });
            }else {
                res.status(200).send({
                    vendedor: vendedorStored
                });
            }
        }
    });
}

function updateVendedor(req, res) {
    var vendedorId = req.params.id;
    var update = req.body;

    Vendedor.findByIdAndUpdate(vendedorId, update, (err, vendedorUpdated) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!vendedorUpdated) {
                res.status(404).send({
                    message: "No se ha actualizado el album"
                });
            }else {
                res.status(200).send({
                    vendedor: vendedorUpdated
                });
            }
        }
    });
}

function deleteVendedor(req, res) {
    var vendedorId = req.params.id;

    Vendedor.findByIdAndRemove(vendedorId, (err, vendedorRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion album'
            });
        }else {
            if(!vendedorRemoved) {
                res.status(404).send({
                    message: 'El album no se ha eliminado'
                });
            }else {
                res.status(200).send({
                vendedor: vendedorRemoved
              });
        }
      }
  });
}
module.exports = {
    getVendedor,
    saveVendedor,
    getVendedores,
    updateVendedor,
    deleteVendedor
};
