'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdministradorSchema = Schema({
   User: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Administrador', AdministradorSchema);
