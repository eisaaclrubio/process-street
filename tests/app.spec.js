'use strict';

describe('Component: processComponent', function () {

  // load the controller's module
  beforeEach(angular.mock.module('processApp'));
  beforeEach(angular.mock.module('process-component.html'));

  var $component, scope, ctrl, element, data;

  // Initialize the controller and mock data
  beforeEach(inject(function ($rootScope, $compile, _$componentController_) {
    // Mock Data
    data = {
      originalFiles: [{
        name: "myMockedVideo.mp4",
        type: "video/mp4",
      }]
    };

    $component = _$componentController_;
    scope = $rootScope.$new();
    element = angular.element('<process-component></process-component>');
    element = $compile('<process-component></process-component>')(scope);
    ctrl = $component('processComponent', { 
        $scope: scope, 
        $element: element,
    }, {});
  }));

  it("should add a file and call isAnAcceptedFile", function() {
    scope.isAnAcceptedFile = jasmine.createSpy('isAnAcceptedFile');
    scope.uploadButton.add({}, data);
    expect(scope.isAnAcceptedFile).toHaveBeenCalled();
  });

  it("should alert when is not a video file", function() {
    spyOn(window, 'alert');
    data.originalFiles[0].name = 'myMock.mp3';
    data.originalFiles[0].type = 'audio/mp3';
    scope.uploadButton.add({}, data);
    expect(window.alert).toHaveBeenCalledWith('The file you are trying to upload is not a video');
  });

  it("should call add and simulate a submit", function () {
    var submit = jasmine.createSpy('submit');
    data.submit = submit;
    scope.uploadButton.add({}, data);
    expect(submit).toHaveBeenCalled();
  });

  it("should call playVideo after done is finished", function () {
    var result = {hashed_id: '3edE3dQ554s'}
    data.result = result;
    scope.playVideo = jasmine.createSpy('playVideo');
    scope.uploadButton.done({}, data);
    expect(scope.playVideo).toHaveBeenCalled();
  });

  it("should alert an error if the upload fails", function () {
    spyOn(window, 'alert');
    var error = { error: '403 (Forbidden)'}
    scope.uploadButton.fail({}, { result: error });
    expect(window.alert).toHaveBeenCalledWith('You have reached the limit for uploaded videos');
  });
});