'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose
var Schema = mongoose.Schema;//Hacemos uso de la librería schema de mongoose

//creamos un schema para el vendedor
var VendedorSchema = Schema({
   Nclientes: Number,
   user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Vendedor', VendedorSchema);//la exportamos a la base de datos
