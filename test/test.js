'use strict';
var request = require("supertest");
var prueba = require('../lib/mensajeria');
var assert = require("assert");


describe("TEST",function()
{
it("Página inicial", function(done) {
		request(prueba)
			.get("/")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});


});
