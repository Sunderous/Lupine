(function (app) {
  'use strict';

  app.registerModule('brewing', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('brewing.admin', ['core.admin']);
  app.registerModule('brewing.admin.routes', ['core.admin.routes']);
  app.registerModule('brewing.services');
  app.registerModule('brewing.routes', ['ui.router', 'core.routes', 'brewing.services']);
}(ApplicationConfiguration));
