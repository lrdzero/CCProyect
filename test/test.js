'use strict';

var prueba = require('../lib/mensajeria');
var assert = require("assert");


describe("TEST",function(){
it('Creación de usuario', function(done) {
    prueba.insertarUsuario("usuarioxxx",12); 
    prueba.comprobacion("usuarioxxx",function(err,resultado){
			assert.equal(resultado, true)});
    done();
  });
});
