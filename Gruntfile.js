'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'client/',
        src: ['**/*.html', 'css/**/*', 'img/**/*'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['client/js/**/*.js'],
        dest: 'build/bundle.js'
      }
    }
  });
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
};
