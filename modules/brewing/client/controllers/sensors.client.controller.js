(function () {
  'use strict';

  angular
    .module('brewing')
    .controller('SensorsController', SensorsController);

  SensorsController.$inject = ['$scope', 'sensorResolve', 'Authentication'];

  function SensorsController($scope, sensor, Authentication) {
    var vm = this;

    vm.sensor = sensor;
    vm.authentication = Authentication;

  }
}());
