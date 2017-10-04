'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdministradorSchema = Schema({
   user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Administrador', AdministradorSchema);
