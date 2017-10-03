'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   Nservicio: Number,
   cliente:String,
   nombreEmpleado:{type:Schema.ObjectId,ref:'User'},
   localizacion:String,
   Refacciones:String,
   baterias:String,
   tipo:String
});

module.exports = mongoose.model('Venta', UserSchema);
