function processController($scope, $http) {
    $scope.myVariable = 'Hello World';
};

angular.module('processApp', ['blueimp.fileupload'])
    .config(['$httpProvider', 'fileUploadProvider', function ($httpProvider, fileUploadProvider) {
            angular.extend(fileUploadProvider.defaults, {
                acceptFileTypes: /(\.|\/)(avi|wmv|flv|mp4|mov)$/i
            });
    }])
    .controller('processController', processController)
    .component('processComponent', {
        templateUrl: 'partials/process-component.html',
        controller: 'processController'
});