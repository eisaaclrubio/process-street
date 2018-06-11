function processController($scope, $http) {
        // Setting myValues variable  
        $scope.myValues = {};
   
        // Override "add" method to submit after selecting a file
        $scope.submitFile = function () {
            $('#fileupload').fileupload({
                add: function (e, data) {
                    // Submit and use done to detect when the video was completly uploaded
                    var jqXHR = data.submit()
                        .done(function (result, textStatus, jqXHR) {
                            console.log(result.hashed_id);
                        });
                }
            });
        };
    
        // Add event when Upload button is clicked
        $('#my-file').change($scope.submitFile); 
    
        // Binds the wistia data to fileuploadsubmit so the videos are uploaded correctly
        $('#fileupload').bind('fileuploadsubmit', function (e, data) {
            data.formData = {
                api_password: 'a8f7343a766841df47484280a4eadf94d2e18643dc1d17db5ac96b7d2e47f3df',
                name: $scope.myValues.videoName,
                project_id: 'j6f1ab7xks'
            };
        });
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