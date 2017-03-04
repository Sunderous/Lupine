(function () {
  'use strict';

  angular
    .module('brewing')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Brewing',
      state: 'brewing',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'brewing', {
      title: 'Sensors',
      state: 'sensors.list',
      roles: ['*']
    });
  }
}());
