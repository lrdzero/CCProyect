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
//comentarios para subida

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

app.set('ip', process.env.IP|| '0.0.0.0');
app.set('port', (process.env.PORT || 5000));
var moduloExport={};

console.log("Server iniciado");

app.get('/',function(req,res){
var pagina='<!doctype html><html><head></head><body>';   
    pagina+= '<form action=\"Registro\" method=\"post\">';
    pagina += '<br><a href="/chat.html">Iniciar</a></br>';
    pagina += '<br><input type=\"submit\" value=\"Registrar\"></br>';
    
    pagina += '</form>';
    pagina += '</body></html>';
	res.send(pagina);
});
app.post('/unaAccion',function(req,res) {
	console.log("mensaje");
});
app.post('/Registro', function (req, res) {
  var pagina='<!doctype html><html><head></head><body>';   
    pagina +='<form action=\"registraUser\" method=\"post\"> Usuario: <input type=\"text" name=\"nick\" size=\"10\"><br>clave: <input type=\"text" name=\"pass\" size=\"10\"><br><input type=\"submit\" value=\"Registrar\"></form><br>';  
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
			console.log(nombre);
			console.log(id);
			moduloExport.insertarUsuario(nombre,id);
			
			var pagina='<!doctype html><html><head></head><body>';
			pagina +='<p>Registrado</p>';
    			pagina += '<a href="/">Retornar</a>';
    			pagina += '</body></html>';
    			
			
		}
		else{
			console.log("No insertado");
			var pagina='<!doctype html><html><head></head><body>';
			pagina +='<p>Usuario ya registrado</p>';
    			pagina += '<a href="/">Retornar</a>';
    			pagina += '</body></html>';
   			
		}
		res.send(pagina);
	});
	
	
});
module.exports = moduloExport;
module.exports =app;
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port') + 'liste adress demand: '+app.get('ip'));
}); 
