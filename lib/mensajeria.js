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
//Eliminamos modulo export y añadimos las funciones a app.

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
	var mensaje = req.body.numero2;
	console.log("mensaje");
	 var pagina='<!doctype html><html><head></head><body>';   

	     pagina+='<p>'+mensaje+'</p>';
	     pagina+='</body></html>';
	     res.send(pagina);
});
app.post('/Registro', function (req, res) {
  var pagina='<!doctype html><html><head></head><body>';   
    pagina +='<form action=\"registraUser\" method=\"post\"> Usuario: <input type=\"text" name=\"nick\" size=\"10\"><br>clave: <input type=\"text" name=\"pass\" size=\"10\"><br><input type=\"submit\" value=\"Registrar\"></form><br>';  
    pagina += '<a href="/chat.html">Iniciar</a>';
    pagina += '</body></html>';
    res.send(pagina);
});
app.getDataUserAge = function (nombre1,id,res){
	var result =false;

	var dato=[];
	var number;
	db.serialize(function(){
		db.all("SELECT id from usuario where nombre='"+nombre1+"' and id="+id,function(err,row){
		dato.push({edad:row.id});
		var value=row.id;
		number=parseInt(value);
		console.log(number);
		if(row.length==0){
			res(null,false);
			console.log("No se ha encontrado coincidencia.");
		}
		else{
			res(null,true);
			console.log("Se encontró coincidencia");
		}
		});
});
}
app.borrado=function(nombre1,res){
	db.run("delete from usuario where nombre=(?)",{1:nombre1});
}
app.comprobacion= function (nombre1,id,res){
	
	var result =false;
	
	var dato=[];
	db.serialize(function(){
	 db.all("SELECT nombre  from usuario where nombre='"+nombre1+"'",function(err,row){
		dato.push({nom:row.nombre});		
		console.log("Nombre a buscar" +row.nombre);
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

app.insertarUsuario=function(nombre,valor){
	db.run("Insert into usuario values(?,?2)",{1:nombre,2:valor});
	
}
app.post('/registraUser',function(req,res){
	console.log("Entro en registrar user");
	var nombre = req.body.nick;
	var dato = req.body.pass;
	var id =parseInt(dato);
	var value=false;
	app.comprobacion(nombre,id,function(err,resultado){
		if(!resultado){
			console.log("Insertando");
			console.log(nombre);
			console.log(id);
			app.insertarUsuario(nombre,id);
			
			var pagina='<!doctype html><html><head></head><body>';
			pagina +='<p>Registrado</p>';
    			pagina += '<a href="/">Retornar</a>';
    			pagina += '</body></html>';
			res.send(pagina);
    			
			
		}
		else{
		
			console.log("No insertado");
			var pagina='<!doctype html><html><head></head><body>';
			pagina +='<p>Usuario ya registrado</p>';
    			pagina += '<a href="/">Retornar</a>';
    			pagina += '</body></html>';
			res.send(pagina);
			
   			
		}

		
	});
	
	
	
});



module.exports =app;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port') + 'liste adress demand: '+app.get('ip'));
}); 
