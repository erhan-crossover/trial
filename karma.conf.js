module.exports = function (config) {
  config.set({

    basePath: './',

    files: [
      'app/public/components/angular/angular.js',
      'app/public/components/angular-route/angular-route.js',
      'app/public/components/angular-mocks/angular-mocks.js',
      'app/public/components/**/*.js'

    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
