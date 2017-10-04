'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var user_routes = require('./routes/user');
var contratos_routes = require('./routes/contratos');
var administrador_routes = require('./routes/administrador');
var vendedor_routes = require('./routes/vendedor');
var ingeniero_routes = require('./routes/ingeniero');
//var servicios_routes = require('./routes/servicios');
//var ventas_routes = require('./routes/venta');
var inventario_routes = require('./routes/inventario');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', user_routes);
app.use('/api', inventario_routes);
app.use('/api', contratos_routes);
app.use('/api', administrador_routes);
app.use('/api', vendedor_routes);
app.use('/api', ingeniero_routes);
module.exports = app;
