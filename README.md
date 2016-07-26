
Travis CI [![Build Status](https://travis-ci.org/lrdzero/CCProyect.svg?branch=master)](https://travis-ci.org/lrdzero/CCProyect) Heroku Heroku [![Heroku](https://ccproyect-v-2.herokuapp.com/)

#CCProyect:

##[Rosendo Ismael Fernández Pérez]()

Proyecto para asignatura de cloud computing del Máster de Ingeniería Infromática.

### Para instalar
```
      git clone https://github.com/lrdzero/CCProyect.git
      npm install .
```
### Ejecución 
####Test:
```
      npm test
```
####Despliegue:
```
      npm start
```
###Acceso al mimso:
La aplicación esta disponible en http://localhost:5000/

#Hito 1
El proyecto consiste en la creación de un sistema de mensajería en tiempo real (chat) entre usuarios afiliados a cierta red social. Inicialmente con objetivo de desarrollo personal.

En principio se penso como módulo de un proyecto de mayor envergadura: "Red Social". Finalmente se llevará a cabo la creación simple de un chat con el objetivo de comprobar la funcionalidad de NodeJS y obtener hábito de control de versiones y despliegue de la aplicación.

###Dispondrá de la siguiente funcionalidad:

- Registrarse en el chat.
- Escribir mensajes.
- Recibir mensajes.

###Requeriminetos y tecnologías:

- Mi propia BD (para este modulo) utilizando la tecnología proporcionada por sqlite3.

- Una aplicación web base en la que mostrar el chat mediante el uso de javascript.

- Servidor implementado. Utilizando nodejs para gestión de BD y navegavilidad entre javascript y web.

#Hito 2

##Automatización:

Se ha creado un archivo `Packaje.json` que lleva a cabo la automatización de la instalación. Unicamente necesitamos disponer de la ultima versión de npm y nvm para poder utilizar nodejs.

Para su instalación recurrimos a [nvm](https://github.com/creationix/nvm) y [npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server).
Comprobamos que estan actualizadas o de lo contrario llevamos a cabo el siguiente [proceso de actualización](http://www.dbigcloud.com/bigdata/88-como-actualizar-node-js-a-la-ultima-version-estable.html).
Tras la obtención de ambas y comprobar que usamos la version de node desplegamos el archivo `Packaje.json`.

El código del `packaje.json` es el siguiente:

```
      {
  "name": "ccproyect",
  "version": "1.0.0",
  "description": "Proyecto cc",
  "main": "Gruntfile.js",
  "directories": {
    "doc": "docs",
    "test": "test"
  },
  "dependencies": {
    "body-parser": "^1.14.1",
    "docco": "^0.7.0",
    "express": "^4.13.3",
    "foreman": "^1.4.1",
    "grunt": "^0.4.5",
    "grunt-docco": "^0.4.0",
    "grunt-docco-dir": "^0.1.5",
    "node": "^0.0.0",
    "node-sass": "^3.4.2",
    "sqlite3": "^3.1.1",
    "supertest": "^1.1.0"
  },
  "devDependencies": {
    "docco": "^0.7.0",
    "grunt-docco": "^0.4.0",
    "mocha": "^2.3.4"
  },
  "scripts": {
    "test": "mocha test/test.js ",
    "start": "node lib/mensajeria.js",
    "docco": "grunt docco"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/lrdzero/CCProyect.git"
  },
  "keywords": [
    "cc"
  ],
  "author": "lrdzero",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/lrdzero/CCProyect/issues"
  },
  "homepage": "https://github.com/lrdzero/CCProyect#readme"
}

```

Con esto npm se encargara de generar e instalar los módulos necesarios para el despliegue de la aplicación.

##Test de la aplicación:

Se han creado varios tipos de test; entre ellos podemos dividirlos en dos categorías:
- Test para comprobar carga y funcionalidad de las diferentes páginas de la aplicación.
- Test para comprobar funcionalidad básica en comunicación con BD.


###Test para comprobar carga de páginas:

- [x] Test de página inicial.
```
      it("Página inicial", function(done) {
		request(prueba_pagina)
			.get("/")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});
```

- [x] Test de página de registro.
```
      it("Página de registro", function(done){
		request(prueba_pagina)
			.post("/Registro")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});
```

- [x] Test de mensaje de registro satisfactorio.
```
      it("Registrando user", function(done){
		request(prueba_pagina)
		.post("/registraUser")
		.expect("Content-Type", /text\/html/)
		.expect(200, done);
	
	});
```
- [x] Test de página de acción usuario (envio de mensaje).

```
      it("Accion user" ,function(done){
		request(prueba_pagina)
		.post("/unaAccion")
		.expect("Content-Type", /text\/html/)
		.expect(200, done);
	});
```

###Test para comprobar funcionalidad:

- [x] Test de comprobación de existencia prévia de usuario e inserción.
```
      it("Comprobacion previa de usuario", function(done){
	prueba.insertarUsuario('usuarioxxx',12);
	var nombre="usuarioxxx";
	var decision;
	
	prueba.comprobacion("usuarioxxx",12,function(err,resultado){	
			assert.equal(resultado,true,"incorrecto");
		done();
	});
	
	});
```
- [x] Test de comprobación de edad de usuario existente.
```
      it("Comprobacion de edad", function(done){
	prueba.getDataUserAge("usuarioxxx",12,function(err,resultado){	
			assert.equal(resultado,true);
		done();
	});
	
	});
```
- [x] Test de comprobación de borrado de usuario.

```
      it("Borrado", function(done){
		prueba.borrado("usuarioxxx");
	prueba.comprobacion("usuarioxxx",12,function(err,resultado){	
			assert.equal(resultado,false,"incorrecto");
		done();
	});	
	
	});
```
##Integración Continua:

Se ha llevado a cabo el despliegue en la plataforma de integración continua [Travis-ci.org](https://travis-ci.org/lrdzero/CCProyect).

Utilizando el contenido del archivo integrado en nuestro repositorio [**.travis.yml**](https://github.com/lrdzero/CCProyect/blob/master/.travis.yml)

Cuyo contenido es el siguiente:

```
      language: node_js
node_js:
  - "4.1"
  - "4.0"
  - "0.12"
  - "0.10"

before_install:
   - npm install -g mocha
- npm install -g sqlite3
```

##Documentación:

Para generar el contenido de la documentación hemos utilizado el generador Grunt-docco.

Siguiendo los pasos descritos en el apartado correspondiente del [material del primer tema](http://jj.github.io/CC/documentos/temas/Desarrollo_basado_en_pruebas).
