module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'app/*.js', 'app/features/**/*.js'
      ]
    },

    // clean directories
    clean: {
      initialize: ['dist'],
      production: [
        'dist/js',
        'dist/lib',
        'dist/sass',
        'dist/public/components',
        'dist/public/css/components.css',
        'dist/*.production.js'
      ]
    },

    copy: {
      less: {
        flatten: true,
        expand: true,
        filter: 'isFile',
        dest: 'dist/public/less/',
        src: [
          'app/public/less/variables.scss',
          'app/public/less/*.less',
          'app/features/**/*.less'
        ]
      },
      // copy core (angularjs) javascript files to => dist/js/
      application: {
        flatten: true,
        expand: true,
        filter: 'isFile',
        src: ['app/*.js', 'app/services/*.js', '!app/*.test.js'],
        dest: 'dist/js/'
      },
      // copy feature (angularjs) javascript files to => dist/js/features/
      features: {
        flatten: true,
        expand: true,
        filter: 'isFile',
        src: ['app/features/**/*.js', '!app/features/**/*.test.js'],
        dest: 'dist/js/features/'
      },
      // copy css files and other resources to => dist/
      resources: {
        cwd: 'app/',
        expand: true,
        src: [
          'public/components/bootstrap/dist/css/bootstrap.min.css',
          'public/fonts/**/*',
          'public/images/**/*',
          'favicon.ico'
        ],
        dest: 'dist/'
      },
      glyphicons: {
        cwd: 'app/public/components/bootstrap/',
        expand: true,
        src: [
          'fonts/*'
        ],
        dest: 'dist/public/'
      },
      libraries: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'app/public/components/angular-sanitize/angular-sanitize.min.js'
        ],
        dest: 'dist/lib/'
      },
      modernizr: {
        src: ['app/public/components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js'],
        dest: 'dist/public/js/modernizr.min.js'
      },
      // copy templates to => dist/js/features/
      templates: {
        expand: true,
        cwd: 'app/',
        src: ['features/**/*.html', 'features/**/*.json'],
        dest: 'dist/'
      }
    },

    // change resource inclusion to minified versions
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['app/index.html']
        }
      }
    },

    // combine scss, css and js files for minification process
    concat: {
      less: {
        src: ['dist/public/less/*.less'],
        dest: 'dist/public/less/app.production.less'
      },
      css: {
        src: ['dist/public/components/**/*.css'],
        dest: 'dist/public/css/components.css'
      },
      libraries: {
        options: {
          separator: ';'
        },
        src: ['dist/lib/*'],
        dest: 'dist/lib.production.js'
      },
      application: {
        options: {
          separator: ';'
        },
        src: ['dist/js/app.js', 'dist/js/auth.js', 'dist/js/interest.js'],
        dest: 'dist/app.production.js'
      },
      features: {
        options: {
          separator: ';'
        },
        src: 'dist/js/features/*',
        dest: 'dist/features.production.js'
      }
    },

    // render less to css
    less: {
      production: {
        options: {
          paths: ["app/public/less", "dist/public/less/"],
          syncImport: true,
          cleancss: true,
          compress: true,
          report: 'gzip'
        },
        files: {
          "dist/public/css/app.min.css": "dist/public/less/app.production.less"
        }
      }
    },

    uglify: {
      development: {
        options: {
          mangle: false,
          compress: true,
          report: 'gzip',
          sourceMap: false
        },
        files: {
          'dist/app.min.js': 'dist/app.production.js',
          'dist/features.min.js': 'dist/features.production.js',
          'dist/lib.min.js': 'dist/lib.production.js'
        }
      }
    },

    cssmin: {
      components: {
        options: {
          report: 'gzip',
          keepSpecialComments: '0',
          sourceMap: true
        },
        files: {
          'dist/public/css/components.min.css': [
            'dist/public/css/components.css'
          ]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');;
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', [
    'jshint',
    'clean:initialize',
    'copy',
    'processhtml',
    'concat',
    'less',
    'uglify:development',
    'cssmin',
    'clean:production'
  ]);

};
