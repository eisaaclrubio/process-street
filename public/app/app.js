angular.module('processApp', ['blueimp.fileupload'])
    .controller('processController', processController)
    .component('processComponent', {
        templateUrl: 'partials/process-component.html',
        controller: 'processController'
});
