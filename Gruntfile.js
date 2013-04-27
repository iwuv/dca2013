/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: ['js/dist/'],

    jshint: {
      options: {
        scripturl: true
      },
      prod: {
        files: {
          src: ['Gruntfile.js', '_js/*.js']
        }
      },
      dev: {
        options: {
          debug: true
        },
        files: {
          src: ['Gruntfile.js', '_js/*.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      modernizr: {
        src: [
          '_js/min/modernizr.min.js'
        ],
        dest: 'js/dist/modernizr.min.js'
      },
      allpages: {
        src: [
          '_js/min/jquery.min.js',
          '_js/faq.js'
        ],
        dest: 'js/dist/main.min.js'
      },
      schedule_page: {
        src: [
          '_js/vendor/handlebars.js',
          '_js/vendor/ember.js',
          '_js/schedule.js'
        ],
        dest: 'js/dist/schedule_main.js'
      }
    },

    uglify: {
      schedule: {
        files: {
          'js/dist/schedule_main.min.js': ['js/dist/schedule_main.js']
        }
      }
    },

    watch: {
      js: {
        files: ['_js/*.js'],
        tasks: ['debug']
      }
    }
  });

  // Load Plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Our custom tasks.
  grunt.registerTask('debug', ['clean', 'jshint:dev', 'concat']);
  grunt.registerTask('release', ['debug', 'jshint:prod', 'uglify']);

  // Default task that is run when no arguments are passed.
  grunt.registerTask('default', ['release']);
};