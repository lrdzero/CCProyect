'use strict';

// importar
var express = require('express');

var fs = require('fs');
// instanciar
var app = express();
var bodyParser = require('body-parser');
var info='';

var sqlite3 = require('sqlite3').verbose();

var start = Date.now();
	
var db = new sqlite3.Database('./database.db');

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/../public'));
//comentarios asdfasdf

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

var moduloExport={};

console.log("Server iniciado");
app.get('/', function (req, res) {
  var pagina='<!doctype html><html><head></head><body>';   
    pagina +='<form action=\"registraUser\" method=\"post\"> Usuario: <input type=\"text" name=\"nick\" size=\"10\"><br>clave: <input type=\"text" name=\"pass\" size=\"10\"><br><input type=\"submit\" value=\"Registrar\"></fomr><br>';  
    pagina += '<a href="/chat.html">Iniciar</a>';
    pagina += '</body></html>';
    res.send(pagina);
});
moduloExport.comprobacion= function(nombre1,id,res){
	
	var result =false;
	
	var dato=[];
	db.serialize(function(){
	 db.all("SELECT nombre  from usuario where nombre='"+nombre1+"'",function(err,row){
		dato.push({nom:row.nombre});		
		console.log(row.nombre);
		if(row.length==0){
			res(null,false);
			console.log("Entro en false");
		}
		else{
			res(null,true);
			console.log("Entro en true");
		}
		});
	
});
}
moduloExport.insertarUsuario=function(nombre,valor){
	db.run("Insert into usuario values(?,?2)",{1:nombre,2:valor});
}
app.post('/registraUser',function(req,res){
	console.log("Entro en registrar user");
	var nombre = req.body.nick;
	var dato = req.body.pass;
	var id =parseInt(dato);

	moduloExport.comprobacion(nombre,id,function(err,resultado){
		if(!resultado){
			console.log("Insertando");
			moduloExport.insertarUsuario(nombre,id);
			var pagina='<!doctype html><html><head></head><body>';
      			pagina +='<form action=\"registraUser\" method=\"post\"> Usuario: <input type=\"text" name=\"valor\" size=\"10\"><br>clave: <input type=\"text" name=\"aBorrar\" size=\"10\"><br><input type=\"submit\" value=\"Registrar\"></fomr><br>';
			pagina +='<p>Registrado</p>';
    			pagina += '<a href="/chat.html">Retornar</a>';
    			pagina += '</body></html>';
    			res.send(pagina);
			
		}
		else{
			console.log("No insertado");
			var pagina='<!doctype html><html><head></head><body>';
      			pagina +='<form action=\"registraUser\" method=\"post\"> Usuario: <input type=\"text" name=\"valor\" size=\"10\"><br>clave: <input type=\"text" name=\"aBorrar\" size=\"10\"><br><input type=\"submit\" value=\"Registrar\"></fomr><br>';
			pagina +='<p>Usuario ya registrado</p>';
    			pagina += '<a href="/chat.html">Retornar</a>';
    			pagina += '</body></html>';
   			res.send(pagina);
		}
	});
	
});
module.exports = moduloExport;
app.listen(3000)
