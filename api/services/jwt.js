'use strict'

var jwt = require('jwt-simple');//liberia de jwt para genrear tokens
var moment = require('moment');
var secret = 'clave_secreta_IEEE';

exports.createToken = function(user) {
    var payload = {//hacemos
        sub: user.id_empleado,
        name: user.nombre,
        email: user.email,
        sueldo: user.sueldo,
        role: user.role,
        telefono: user.telefono,
        seguro: user.seguro,
        age: user.age,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);//regresa un json con el token
};
