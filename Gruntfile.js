'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    hogan: {
      all: {
        src: 'js/src/**/*.mustache',
        dest: 'js/src/template.js',
        options: {
          binderName: 'amd'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'js/src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    requirejs: {
      all: {
        options: {
          baseUrl: 'js/src',
          name: 'main',
          out: 'js/app.min.js',
          optimize: 'uglify2',
          paths: {
            'jquery': 'empty:',
            'hogan': 'empty:'
          },
          cjsTranslate: true
        }
      }
    },

    less: {
      all: {
        compress: true,
        files: {
          'css/app.css': 'css/src/app.less'
        }
      }
    },

    csslint: {
      all: {
        src: ['css/**/*.css']
      },
      options: {
        csslintrc: '.csslintrc'
      }
    },

    cssmin: {
      css: {
        files: {
          'css/app.min.css': 'css/app.css'
        }
      }
    },

    intern: {
      all: {
        options: {
          runType: 'client',
          config: 'tests/intern',
          reporters: ['console'],
          suites: ['tests/app']
        }
      }
    },

    connect: {
      all: {
        options: {
          hostname: '*',
          port: process.env.PORT || '6789',
          base: '.',
          livereload: true
        }
      }
    },

    watch: {
      js: {
        files: ['Gruntfile.js', 'js/src/**/*.{js,mustache}', '!js/src/template.js'],
        tasks: ['js'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/src/**/*.less'],
        tasks: ['css'],
        options: {
          livereload: true
        }
      },
      general: {
        files: ['index.html', 'tests/**/*.js'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hogan');
  grunt.loadNpmTasks('intern');

  grunt.registerTask('css', ['less', 'csslint', 'cssmin']);
  grunt.registerTask('js', ['jshint', 'hogan', 'requirejs']);
  grunt.registerTask('build', ['js', 'css']);
  grunt.registerTask('test', ['build', 'intern']);
  grunt.registerTask('start', ['build', 'intern', 'connect', 'watch']);
  grunt.registerTask('default', ['start']);
};
