// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: 'app/',

    // When Karma is watching the files for changes, it tries to batch multiple changes into a single run
    // so that the test runner doesn't try to start and restart running tests more than it should
    autoWatchBatchDelay: 300,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','jquery-chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'public/components/jquery/dist/jquery.js',
      'public/components/angular/angular.js',
      'public/components/angular-loader/angular-loader.min.js',
      'public/components/angular-sanitize/angular-sanitize.min.js',
      'public/components/angular-mocks/angular-mocks.js',
      'public/components/angular-translate/angular-translate.min.js',
      'public/components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
      'public/components/angular-ui-router/release/angular-ui-router.min.js',
      'public/components/angular-bootstrap/ui-bootstrap.min.js',
      'public/components/moment/min/moment.min.js',
      'public/components/less/dist/less.js',
      'public/components/nprogress/nprogress.js',
      'public/components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',

      'app.js',
      'services/*.js',

      'features/**/*.html',
      'features/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './features/**/*.html': 'ng-html2js',
      './features/**/!(*.test).js': 'coverage',
      './services/!(*.test).js': 'coverage',
      './!(*.test).js': 'coverage'
    },

    ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      // stripPrefix: "source/path/to/templates/.*/",
      // prependPrefix: "web/path/to/templates/",

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'Templates'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir  : '../test/coverage'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome',/*'Chrome_Modified_Stack_Limit'*/],

    customLaunchers: {
      Chrome_Modified_Stack_Limit: {
        base: 'Chrome',
        flags: ['--js-flags="--stack-trace-limit 20"']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    plugins: [
      'karma-chrome-launcher',
      'karma-jquery-chai',
      'karma-mocha',
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-sinon'
    ]
  });
};
