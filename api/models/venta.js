'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   Nventa: Number,
   monto:Number,
   Idparte:{type:Schema.ObjectId,ref:'inventario'},
   comision:Number,
   cliente:String,
   fecha:String,
   tipo:String,
});

module.exports = mongoose.model('venta', UserSchema);
