'use strict';
var request = require("supertest");
var prueba = require('../lib/mensajeria');
var prueba_pagina= require('../lib/mensajeria');
var assert = require("assert");


describe("TEST",function()
{

it("Página inicial", function(done) {
		request(prueba_pagina)
			.get("/")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});
it("Página de registro", function(done){
		request(prueba_pagina)
			.post("/Registro")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});

it("Registrando user", function(done){
		request(prueba_pagina)
		.post("/registraUser")
		.expect("Content-Type", /text\/html/)
		.expect(200, done);
	
	});

it("Accion user" ,function(done){
		request(prueba_pagina)
		.post("/unaAccion")
		.expect("Content-Type", /text\/html/)
		.expect(200, done);
	});

it("Comprobacion previa de usuario", function(done){
	prueba.insertarUsuario('usuarioxxx',12);
	var nombre="usuarioxxx";
	var decision;
	
	prueba.comprobacion("usuarioxxx",12,function(err,resultado){	
			assert.equal(resultado,true,"incorrecto");
		done();
	});
	
	});

it("Comprobacion de edad", function(done){
	prueba.getDataUserAge("usuarioxxx",12,function(err,resultado){	
			assert.equal(resultado,true);
		done();
	});
	
	});

it("Borrado", function(done){
		prueba.borrado("usuarioxxx");
	prueba.comprobacion("usuarioxxx",12,function(err,resultado){	
			assert.equal(resultado,false,"incorrecto");
		done();
	});	
	
	});




});
