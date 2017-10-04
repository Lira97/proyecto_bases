'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Administrador = require('../models/administrador');
var User = require('../models/users');

function getAdministrador(req, res) {
    var administradorId = req.params.id;

    Administrador.findById(administradorId).populate({path: 'user'}).exec((err, administrador) => {
        if(err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!administrador) {
                res.status(404).send({
                    message: "No existe album"
                });
            }else {
                res.status(200).send({
                    administrador
                });
            }
        }
    });
}

function getAdministradores(req, res) {
    var administradorId = req.params.user;

    if(!administradorId) {
        var find = Administrador.find({}).sort('nombre');
    }else {
        var find = Administrador.find({administrador: administradorId}).sort('nombre');
    }

    find.populate({path: 'user'}).exec((err, albums) => {
        if(err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!administrador) {
                res.status(404).send({
                    message: "No existen albums"
                });
            }else {
                res.status(200).send({
                    administrador
                });
            }
        }
    });
}

function saveAdministrador(req, res) {
    var administrador = new Administrador();
    var params = req.body;

    administrador.user = params.user;

    administrador.save((err, administradorStored) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!administradorStored) {
                res.status(404).send({
                    message: "No se ha guardado el album"
                });
            }else {
                res.status(200).send({
                    administrador: administradorStored
                });
            }
        }
    });
}

function updateAdministrador(req, res) {
    var administradorId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(administradorId, update, (err, administradorUpdated) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!administradorUpdated) {
                res.status(404).send({
                    message: "No se ha actualizado el album"
                });
            }else {
                res.status(200).send({
                    administrador: administradorUpdated
                });
            }
        }
    });
}

function deleteAdministrador(req, res) {
    var administradorId = req.params.id;

    Album.findByIdAndRemove(administradorId, (err, administradorRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion album'
            });
        }else {
            if(!administradorRemoved) {
                res.status(404).send({
                    message: 'El album no se ha eliminado'
                });
            }else {
                res.status(200).send({
                administrador: administradorRemoved
            });
        }
      }
  });
}
module.exports = {
    getAdministrador,
    saveAdministrador,
    getAdministradores,
    updateAdministrador,
    deleteAdministrador
};
