(function () {
  'use strict';

  angular
    .module('brewing.services')
    .factory('BrewingService', BrewingService);

  BrewingService.$inject = ['$resource', '$log'];

  function BrewingService($resource, $log) {
    var Sensor = $resource('/api/sensors/:sensorId', {
      sensorId: '@sensorId'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Sensor.prototype, {
      createOrUpdate: function () {
        var sensor = this;
        return createOrUpdate(sensor);
      }
    });

    return Sensor;

    function createOrUpdate(sensor) {
      if (sensor._id) {
        return sensor.$update(onSuccess, onError);
      } else {
        return sensor.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(sensor) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
