'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var ventas = require('../models/venta');
var user = require('../models/users');


function getVenta(req, res) {//creamos la funcion para obtener una venta
    var ventasId = req.params.id;//Creamos una variable que guarde los parámetros del body

    ventas.findById(ventasId, (err, venta) => {//Hacemos la llamada a la base de datos por medio del la función de findById
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'//La respuesta es un error entonces regresa un mensaje de error
            });
        }else {
            if(!venta) {
                res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                    message: 'La venta no existe'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    venta
                });
            }
        }
    });
}

function saveVenta(req, res) {//creamos la funcion para guardar nuevas ventas
    var venta = new ventas();//Creamos una variable y la igualamos a un nuevo schema
    //regresamos lo valores del body y los igualamos a los del schema
    var params = req.body;
    venta.Nventa = params.Nventa;
    venta.monto = params.monto;
    venta.nombreVendedor = params.nombreVendedor;
    venta.comision = params.comision;
    venta.cliente = params.cliente;
    venta.fecha = params.fecha;
    venta.tipo = params.tipo;

    venta.save((err, ventaStored) => {//La respuesta es un error entonces regresa un mensaje de error
        if(err) {
            res.status(500).send({
                message: 'Error al guardar'
            });
        }else {
            if(ventaStored) {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    venta: ventaStored
                });
            }else {
                res.status(404).send({//Si no puede guardar el dato en la base de datos regresa un mensaje de error
                    message: 'El venta no se pudo guardar'
                });
            }
        }
    });
}

function getVentas(req, res) {//creamos la funcion para obtener a las ventas

    var itemsPerPage = 3;//asignamos cuantos productos se veran por pagina

    if(req.params.page) {//usamos la paginacion de mongoose del body
        page = req.params.page;
    }else{
      var page = 1;//si no recibe el dato se le asigna uno
    }

    ventas.find().sort('Nventa').paginate(page, itemsPerPage, function(err, ventas, total) {//buscamos en la base de datos y lo ordenamos por el nombre de la empresa
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!ventas) {//Si no encuentra el dato en la base de datos regresa un mensaje de error
                res.status(404).send({
                    message: 'No hay artistas'
                });
            }else {
                return res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    total_items: total,
                    ventas: ventas
                });
            }
        }
    });
}

function updateVenta(req, res) {//creamos la funcion para actualizar a un venta
    var ventasId = req.params.id;//Creamos una variable que guarde los parámetros del body
    var update = req.body;//Creamos una variable que guarde los parámetros del body

    ventas.findByIdAndUpdate(ventasId, update, (err, ventaUpdated) => {
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion'
            });
        }else {
            if(!ventaUpdated) {
                res.status(404).send({//Si no puede actualizar el dato en la base de datos regresa un mensaje de error
                    message: 'El venta no ha sido actualizado'
                });
            }else {
                res.status(200).send({//Si lo encuentra regresa el dato solicitado
                    venta: ventaUpdated
                });
            }
        }
    });
}

function deleteVenta(req, res) {//creamos la funcion para eliminar a una venta
    var ventasID = req.params.id;//Creamos una variable que guarde los parámetros del body

    ventas.findByIdAndRemove(ventasID, (err, ventaRemoved) => {//La respuesta es un error entonces regresa un mensaje de error
        if(err) {
            res.status(500).send({//La respuesta es un error entonces regresa un mensaje de error
                message: 'Error en la peticion '
            });
        }else {
            if(!ventaRemoved) {
                res.status(404).send({//Si no puede eliminar el dato en la base de datos regresa un mensaje de error
                    message: 'El venta no se ha eliminado'
                });
            }else {
              res.status(200).send({//Si lo encuentra regresa el dato solicitado
                venta: ventaRemoved,
                });
              }
            }
        });
    }

    function getFechas(req, res) {//creamos la funcion para obtener una venta
      var params = req.body;
        var fechaInicio = params.fechaInicio;//Creamos una variable que guarde los parámetros del body
        var fechaFin = params.fechaFin;
        ventas.count({"fecha": { $gte:fechaInicio, $lt:fechaFin }}, (err, venta) => {//Hacemos la llamada a la base de datos por medio del la función de findById
            if(err) {
                res.status(500).send({
                    message: 'Error en la peticion'//La respuesta es un error entonces regresa un mensaje de error
                });
            }else {
                if(!venta) {
                    res.status(404).send({//Si no encuentra el dato en la base de datos regresa un mensaje de error
                        venta
                    });
                }else {
                    res.status(200).send({//Si lo encuentra regresa el dato solicitado

                        venta
                    });
                }
            }
        });

    }
module.exports = {//exportamos todos los metodos
    getVenta,
    saveVenta,
    getVentas,
    updateVenta,
    deleteVenta,
    getFechas
};
