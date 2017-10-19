'use strict'

var jwt = require('jwt-simple');//Hacemos uso de la libreria jwt para crear un token
var moment = require('moment');
var secret = 'clave_secreta_IEEE';//creamos una clave

exports.ensureAuth = function(req, res, next) {
    if(!req.headers.authorization) {//si el JSON no nos regresa nada entonces devolvemos un mensaje de error
        return res.status(403).send({
            message: 'La peticion no tiene la cabezera de autenticacion'
        });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');//cremos el token

    try {
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()) {//si el tiempo limite expira entonces el token expira
            return res.status(401).send({
                message: 'Token expiro'
            });
        }
    }catch(ex) {//si no lo encuentra regresa un mensaje  
        //console.log(ex);
        return res.status(404).send({
            message: 'Token no es valido'
        });
    }

    req.user = payload;

    next();
};
