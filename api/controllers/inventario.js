'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var inventario = require('../models/inventario');


function getProduct(req, res) {
    var productoId = req.params.id;

    inventario.findById(productoId, (err, product) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!product) {
                res.status(404).send({
                    message: 'El producto no existe'
                });
            }else {
                res.status(200).send({
                    product
                });
            }
        }
    });
}

function saveProduct(req, res) {
    var producto = new inventario();

    var params = req.body;
    producto.Nserie = params.Nserie;
    producto.modelo = params.modelo;
    producto.cantidad = params.cantidad;
    producto.serie = params.serie;
    producto.capacidad = params.capacidad;

    producto.save((err, productoStored) => {
        if(err) {
            res.status(500).send({
                message: 'Error al guardar el producto'
            });
        }else {
            if(productoStored) {
                res.status(200).send({
                    producto: productoStored
                });
            }else {
                res.status(404).send({
                    message: 'El producto no se pudo guardar'
                });
            }
        }
    });
}

function getProducts(req, res) {
    if(req.params.page) {
        page = req.params.page;
    }else
    {
      var page = 1;
    }
    var itemsPerPage = 100;

    inventario.find().sort('Nserie').paginate(page, itemsPerPage, function(err, products, total) {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!products) {
                res.status(404).send({
                    message: 'No hay artistas'
                });
            }else {
                return res.status(200).send({
                    total_items: total,
                    products: products
                });
            }
        }
    });
}

function updateInventario(req, res) {
    var productoId = req.params.id;
    var update = req.body;

    inventario.findByIdAndUpdate(productoId, update, (err, productUpdated) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else {
            if(!productUpdated) {
                res.status(404).send({
                    message: 'El artista no ha sido actualizado'
                });
            }else {
                res.status(200).send({
                    product: productUpdated
                });
            }
        }
    });
}

function deleteProduct(req, res) {
    var productoId = req.params.id;

    inventario.findByIdAndRemove(productoId, (err, productRemoved) => {
        if(err) {
            res.status(500).send({
                message: 'Error en la peticion artista'
            });
        }else {
            if(!productRemoved) {
                res.status(404).send({
                    message: 'El artista no se ha eliminado'
                });
            }else {
              res.status(200).send({
                product: productRemoved,
                });
              }
            }
        });
    }

module.exports = {
    getProduct,
    saveProduct,
    getProducts,
    updateInventario,
    deleteProduct
};
