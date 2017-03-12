(function() {
    'use strict';

    angular
        .module('brewing')
        .controller('SensorsListController', SensorsListController);

    SensorsListController.$inject = ['$scope', '$state', 'BrewingService', 'Socket', 'Authentication'];

    function SensorsListController($scope, $state, BrewingService, Socket, Authentication) {
        var vm = this;

        vm.sensors = BrewingService.query();

        init();

        function init() {
            // If user is not signed in then redirect back home
            if (!Authentication.user) {
                $state.go('home');
            }

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