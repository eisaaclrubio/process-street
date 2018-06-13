// Karma configuration
// Generated on Mon Jun 11 2018 15:42:06 GMT-0500 (CDT)
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './public/bower_components/jquery/dist/jquery.min.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './public/partials/process-component.html',
      './public/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload-image.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload-video.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js',
      './public/bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
      './public/app/app.controller.js',
      './public/app/app.js',
      './tests/app.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './public/partials/process-component.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        return filepath.replace('public/', '');
      },
      moduleName: 'process-component.html'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
