'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Ingeniero = require('../models/ingenieros');
var User = require('../models/users');

function getIngeniero(req, res) {
    var ingenieroId = req.params.id;

    Ingeniero.findById(ingenieroId).populate({path: 'user'}).exec((err, ingeniero) => {
        if(err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!ingeniero) {
                res.status(404).send({
                    message: "No existe album"
                });
            }else {
                res.status(200).send({
                    ingeniero
                });
            }
        }
    });
}

function getIngenieros(req, res) {
    var ingenieroId = req.params.user;

    if(!ingenieroId) {
        var find = Ingeniero.find({}).sort('nombre');
    }else {
        var find = Ingeniero.find({ingeniero: ingenieroId}).sort('nombre');
    }

    find.populate({path: 'user'}).exec((err, ingeniero) => {
        if(err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        }else {
            if(!ingeniero) {
                res.status(404).send({
                    message: "No existen albums"
                });
            }else {
                res.status(200).send({
                    ingeniero
                });
            }
        }
    });
}

function saveIngeniero(req, res) {
    var ingeniero = new Ingeniero();
    var params = req.body;

    ingeniero.Nservicios=params.Nservicios
    ingeniero.user = params.user;

    ingeniero.save((err, ingenieroStored) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!ingenieroStored) {
                res.status(404).send({
                    message: "No se ha guardado el album"
                });
            }else {
                res.status(200).send({
                    ingeniero: ingenieroStored
                });
            }
        }
    });
}

function updateIngeniero(req, res) {
    var ingenieroId = req.params.id;
    var update = req.body;

    Ingeniero.findByIdAndUpdate(ingenieroId, update, (err, ingenieroUpdated) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!ingenieroUpdated) {
                res.status(404).send({
                    message: "No se ha actualizado el album"
                });
            }else {
                res.status(200).send({
                    ingeniero: ingenieroUpdated
                });
            }
        }
    });
}

function deleteIngeniero(req, res) {
    var ingenieroId = req.params.id;

    Ingeniero.findByIdAndRemove(ingenieroId, (err, ingenieroRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion album'
            });
        }else {
            if(!ingenieroRemoved) {
                res.status(404).send({
                    message: 'El album no se ha eliminado'
                });
            }else {
                res.status(200).send({
                ingeniero: ingenieroRemoved
              });
        }
      }
  });
}
module.exports = {
    getIngeniero,
    saveIngeniero,
    getIngenieros,
    updateIngeniero,
    deleteIngeniero
};
