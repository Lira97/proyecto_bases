'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose
var Schema = mongoose.Schema;//Hacemos uso de la librería schema de mongoose

//creamos un schema para el inventario
var UserSchema = Schema({
   Nserie: Number,
   modelo: String,
   cantidad:Number,
   serie:String,
   capacidad:Number,
});

module.exports = mongoose.model('inventario', UserSchema);//la exportamos a la base de datos
