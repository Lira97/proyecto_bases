'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var servicios = require('../models/servicios');
var user = require('../models/users');


function getServicio(req, res) {//creamos la funcion para obtener un servicio
    var serviciosId = req.params.id;//Creamos una variable que guarde los parámetros del body


    servicios.findById(serviciosId, (err, servicio) => {//Hacemos la llamada a la base de datos por medio del la función de findById
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!servicio) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: 'El servicio no existe'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    servicio
                });
            }
        }
    });
}

function saveServicio(req, res) {//creamos la funcion para guardar nuevos servicio
    var servicio = new servicios();//Creamos una variable y la igualamos a un nuevo schema
    //regresamos lo valores del body y los igualamos a los del schema
    var params = req.body;
    servicio.cliente = params.cliente;
    servicio.nombreEmpleado = params.nombreEmpleado;
    servicio.localizacion = params.localizacion;
    servicio.Refacciones = params.Refacciones;
    servicio.baterias = params.baterias;
    servicio.tipo = params.tipo;
    if ( !servicio.cliente || !servicio.nombreEmpleado || !servicio.localizacion  || !servicio.Refacciones||  !servicio.baterias||  !servicio.tipo )
    {
      return res.status(404).send({
          message: 'Los datos no puede estar vacios'
      });
    }
    servicio.save((err, servicioStored) => {//La respuesta es un error entonces regresa un mensaje de error
        if(err) {
            res.status(500).send({
                message: 'Error al guardar el producto'
            });
        }else {
            if(servicioStored) {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    servicio: servicioStored
                });
            }else {
                res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    message: 'El producto no se pudo guardar'
                });
            }
        }
    });
}

function getServicios(req, res) {//creamos la funcion para obtener a los servicio
  if(req.params.page) {//usamos la paginacion de mongoose del body
      page = req.params.page;
  }else{
    var page = 1;//si no recibe el dato se le asigna uno
  }
  var itemsPerPage = 100;//asignamos cuantos productos se veran por pagina
    servicios.find().sort('Nventa').paginate(page, itemsPerPage, function(err, servicios, total) {//buscamos en la base de datos y lo ordenamos por el nombre de la empresa
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!servicios) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: 'No hay servicio'
                });
            }else {
                return res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    total_items: total,
                    servicios: servicios
                });
            }
        }
    });
}

function updateServicio(req, res) {//creamos la funcion para actualizar a un servicio
    var serviciosId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    servicios.findByIdAndUpdate(serviciosId, update, (err, servicioUpdated) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!servicioUpdated) {
                res.status(404).send({//Si no puede actualizar el dato en la base de datos regresa un mensaje de error
                    message: 'El servicio no ha sido actualizado'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    servicio: servicioUpdated
                });
            }
        }
    });
}

function deleteServicio(req, res) {//creamos la funcion para eliminar a un servicio
    var serviciosID = req.params.id;//Creamos una variable que guarde los parámetros del body

    servicios.findByIdAndRemove(serviciosID, (err, servicioRemoved) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion artista'
            });
        }else {
            if(!servicioRemoved) {
                res.status(404).send({//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                    message: 'El servicio no se ha eliminado'
                });
            }else {
              res.status(200).send({//Si lo encuentra regresa el dato solicitado
                servicio: servicioRemoved,
                });
              }
            }
        });
    }
    function allservicios(req, res) {//creamos la funcion para obtener una venta
      var params = req.body;

        servicios.count({}, (err, servicios) => {//Hacemos la llamada a la base de datos por medio del la función de findById
            if(err) {
                res.status(500).send({
                    message: 'Error en la peticion'//La respuesta es un error entonces regresa un mensaje de error
                });
            }else {
                if(!servicios) {
                    res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                        servicios
                    });
                }else {
                    res.status(200).send({//Si lo encuentra regresa el dato solicitado

                        servicios
                    });
                }
            }
        });

    }

module.exports = {//exportamos todos los metodos
    getServicio,
    saveServicio,
    getServicios,
    updateServicio,
    deleteServicio,
    allservicios
};
