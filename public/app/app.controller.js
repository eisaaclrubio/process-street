function processController($scope, $http) {
    // Declaring variables
    $scope.myValues = {};
    $scope.uploadButton = angular.element('#myUpload');
    $scope.barType = 'progress-bar-success';
    $scope.progressBar = {'display': 'none'};

    // Starts the embedded video from wistia
    $scope.playVideo = function(id) {
        window._wq = window._wq || [];
        _wq.push({ id: id, 
            onReady: function(video) {
                video.bind('play', function() {
                    video.time(0);
                    return video.unbind;
                });
            }
        });
    };

    // Override acceptFileTypes
    $scope.isAnAcceptedFile = function(data) {
        var acceptFileTypes = /(\.|\/)(avi|wmv|flv|mp4|mov)$/i;
        if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
            alert('The file you are trying to upload is not a video');
            return false;
        }
        return true;
    }

    // Override fileupload
    $scope.uploadButton = {
        url: 'https://upload.wistia.com/',
        // Override "add" method to submit after selecting a file
        add: function (e, data) {
            data.formData = {
                api_password: 'a8f7343a766841df47484280a4eadf94d2e18643dc1d17db5ac96b7d2e47f3df',
                name: $scope.myValues.videoName,
                project_id: 'j6f1ab7xks'
            };
            // If a video exists is removed to start new embedded video
            if (angular.element('.wistia_embed').length) {
                angular.element('.wistia_embed').remove();
            }
            $('.panel-body').css('height', 'auto');
            // Default acceptFiles is not working
            if($scope.isAnAcceptedFile(data)){
                // Submit
                data.submit();
            }
        },
        done: function (e, data) {
            $scope.playVideo(data.result.hashed_id);
            $scope.progressBar = {'display': 'none'};
            $scope.progress = {'width' : '0%'};
            $scope.$apply();
            angular.element('.panel-body').append('<div class="wistia_embed">&nbsp;</div>');
            angular.element('.wistia_embed').addClass('wistia_async_' + data.result.hashed_id);
            angular.element('.panel-body').css('height', '525px');
        },
        // Control to display progress bar
        start: function (e, data) {
            $scope.progressBar = {'display': 'block'};
            $scope.$apply();
        },
        // Overwriting progress bar function
        progress: function (e, data) {
            var percentage = data.loaded / data.total * 100;
            $scope.barType = 'progress-bar-success';
            $scope.progress = {'width' : percentage + '%'};
            $scope.$apply();
        },
        // Handling limited videos error
        fail: function (e, data) {
            $scope.barType = 'progress-bar-danger';
            $scope.progress = {'width' : '100%'};
            $scope.$apply();
            alert('You have reached the limit for uploaded videos');
        }
    };
};
