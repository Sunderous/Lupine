(function () {
  'use strict';

  angular
    .module('brewing')
    .controller('SensorsListController', SensorsListController);

  SensorsListController.$inject = ['BrewingService'];

  function SensorsListController(BrewingService) {
    var vm = this;

    vm.sensors = BrewingService.query();
  }
}());
