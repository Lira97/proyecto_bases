'use strict'

var express = require('express');//Hacemos uso de la librería express

var bodyParser = require('body-parser');//Hacemos uso de la librería body parser


var app = express();

var user_routes = require('./routes/user');//creamos una varia para dirigirnos a las rutas del modelo

var contratos_routes = require('./routes/contratos');//creamos una varia para dirigirnos a las rutas del modelo

var administrador_routes = require('./routes/administrador');//creamos una varia para dirigirnos a las rutas del modelo

var vendedor_routes = require('./routes/vendedor');//creamos una varia para dirigirnos a las rutas del modelo

var ingeniero_routes = require('./routes/ingeniero');//creamos una varia para dirigirnos a las rutas del modelo

var servicios_routes = require('./routes/servicios');//creamos una varia para dirigirnos a las rutas del modelo


var ventas_routes = require('./routes/ventas');//creamos una varia para dirigirnos a las rutas del modelo

var inventario_routes = require('./routes/inventario');//creamos una varia para dirigirnos a las rutas del modelo


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origen, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', ' GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', ' GET, POST, OPTIONS, PUT, DELETE');

    next();
});
app.use('/api', user_routes);//hacemos el uso de las ruta

app.use('/api', inventario_routes);//hacemos el uso de las ruta

app.use('/api', contratos_routes);//hacemos el uso de las ruta

app.use('/api', administrador_routes);//hacemos el uso de las ruta

app.use('/api', vendedor_routes);//hacemos el uso de las ruta

app.use('/api', ingeniero_routes);//hacemos el uso de las ruta

app.use('/api', servicios_routes);//hacemos el uso de las ruta

app.use('/api', ventas_routes);//hacemos el uso de las ruta

module.exports = app;
