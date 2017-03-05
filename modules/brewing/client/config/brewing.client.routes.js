(function () {
  'use strict';

  angular
    .module('brewing.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('brewing', {
        abstract: true,
        url: '/brewing',
        template: '<ui-view/>'
      })
      .state('brewing.list', {
        url: '',
        templateUrl: '/modules/brewing/client/views/list-sensors.client.view.html',
        controller: 'SensorsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sensors List'
        }
      });
  }

  getSensor.$inject = ['$stateParams', 'BrewingService'];

  function getSensor($stateParams, BrewingService) {
    return BrewingService.get({
      sensorId: $stateParams.sensorId
    }).$promise;
  }
}());
