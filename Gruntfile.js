'use strict';

module.exports = function(grunt) {

 
  // Configuración del proyecto
  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  docco: {
	  debug: {
	  src: ['*.js','./lib/*.js'],
	  options: {
		  output: 'docs/'
	  }
	  }
  },
   mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'docs/results.txt', // Optionally capture the reporter output to a file 
          quiet: false, // Optionally suppress output to standard out (defaults to false) 
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
        },
        src: ['test/**/*.js']
      }
    }
  });

  // Carga el plugin de grunt para hacer esto
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  // Tarea por omisión: generar la documentación
  grunt.registerTask('default', ['docco','mochaTest']);
  
};


