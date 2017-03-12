(function() {
    'use strict';

    angular
        .module('brewing')
        .controller('SensorsListController', SensorsListController);

    SensorsListController.$inject = ['$scope', 'BrewingService', 'Socket'];

    function SensorsListController(BrewingService, Socket) {
        var vm = this;

        vm.sensors = BrewingService.query();

        init();

        function init() {

            // Make sure the Socket is connected
            if (!Socket.socket) {
                Socket.connect();
            }

            // Add an event listener to the 'chatMessage' event
            Socket.on('sensor.updated', function(sensor) {
                console.log(sensor);
            });

            // Remove the event listener when the controller instance is destroyed
            $scope.$on('$destroy', function() {
                Socket.removeListener('chatMessage');
            });
        }
    }


}());