'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose
var Schema = mongoose.Schema;//Hacemos uso de la librería schema de mongoose

//creamos un schema para el servicios
var ServiciosSchema = Schema({
   Nservicio: Number,
   cliente:String,
   nombreEmpleado:{type:Schema.ObjectId,ref:'User'},
   localizacion:String,
   Refacciones:String,
   baterias:String,
   tipo:String
});

module.exports = mongoose.model('Venta', ServiciosSchema);//la exportamos a la base de datos
