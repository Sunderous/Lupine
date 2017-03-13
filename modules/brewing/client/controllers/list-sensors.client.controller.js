(function() {
    'use strict';

    var FusionCharts = require('fusioncharts');
    require('fusioncharts/fusioncharts.charts');

    angular
        .module('brewing')
        .controller('SensorsListController', SensorsListController);

    SensorsListController.$inject = ['$scope', 'BrewingService', 'Socket'];

    function SensorsListController($scope, BrewingService, Socket) {
        var vm = this;

        vm.sensors = BrewingService.query();

        init();

        var chart = new FusionCharts({
            "type": "column2d",
            "width": "500",
            "height": "300",
            "dataFormat": "json",
            "dataSource": {
                chart: {},
                data: [{ value: 500 }, { value: 600 }, { value: 700 }]
            }
        }).render("chartContainer");

        function init() {

            // Make sure the Socket is connected
            if (!Socket.socket) {
                Socket.connect();
            }

            // Add an event listener to the 'chatMessage' event
            Socket.on('sensor.updated', function(sensor) {
                console.log(sensor);
                vm.sensors.forEach(function(currentSensor) {
                    if (sensor.sensorId === currentSensor.sensorId) {
                        currentSensor.value = sensor.value;
                    }
                });
            });

            // Remove the event listener when the controller instance is destroyed
            $scope.$on('$destroy', function() {
                Socket.removeListener('chatMessage');
            });
        }
    }


}());