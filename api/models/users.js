'use strict'

var mongoose = require('mongoose');//Hacemos uso de la librería mongoose
var Schema = mongoose.Schema;//Hacemos uso de la librería schema de mongoose

//creamos un schema para el user
var UserSchema = Schema({
   id_empleado: String,
   nombre: String,
   email: String,
   password: String,
   sueldo:Number,
   role: String,
   telefono:Number,
   seguro:Number,
   age:Number
});

module.exports = mongoose.model('User', UserSchema);//la exportamos a la base de datos
