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
  }
  mochaTest: {
	test: {
	   options:{
		reporter: 'spec',
		captureFile: 'docs/test/results.txt',
		quiet: false,
		clearRequireCache:false
	    },
	    src: ['test/**/*.js']
	}
  }
  });

  // Carga el plugin de grunt para hacer esto
  grunt.loadNpmTasks('grunt-docco');

  // Tarea por omisión: generar la documentación
  grunt.registerTask('default', ['docco']);
  grunt.registerTask('default', 'mochaTest');
};


