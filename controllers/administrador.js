'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Administrador = require('../models/administrador');
var user = require('../models/users');

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
    var administradorId = req.params.artist;

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

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if(err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else {
            if(!albumUpdated) {
                res.status(404).send({
                    message: "No se ha actualizado el album"
                });
            }else {
                res.status(200).send({
                    album: albumUpdated
                });
            }
        }
    });
}

function deleteAlbum(req, res) {
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion album'
            });
        }else {
            if(!albumRemoved) {
                res.status(404).send({
                    message: 'El album no se ha eliminado'
                });
            }else {
                Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                    if(err) {
                        res.status(500).send({
                            message: 'Error en la peticion cancion'
                        });
                    }else {
                        if(!songRemoved) {
                            res.status(404).send({
                                message: 'La cancion no se ha eliminado'
                            });
                        }else {
                            res.status(200).send({
                                album: albumRemoved,
                                song: songRemoved
                            });
                        }
                    }
                });
            }
        }
    });
}
module.exports = {
    getAdministrador,
    saveAdministrador,
    getAdministradores,
    updateAlbum,
    deleteAlbum
};
