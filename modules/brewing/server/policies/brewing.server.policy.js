'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Brewing Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/brewing',
      permissions: '*'
    }, {
      resources: '/api/brewing/sensors',
      permissions: '*'
    }, {
      resources: '/api/brewing/sensors/:sensorId',
      permissions: '*'
    }]
  }, {
    roles: ['brewer'],
    allows: [{
      resources: '/api/brewing',
      permissions: '*'
    }, {
      resources: '/api/brewing/sensors',
      permissions: '*'
    }, {
      resources: '/api/brewing/sensors/:sensorId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/brewing',
      permissions: ['get']
    }, {
      resources: '/api/brewing/sensors',
      permissions: ['get', 'put']
    }, {
      resources: '/api/brewing/sensors/:sensorId',
      permissions: ['get', 'put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/brewing',
      permissions: ['get']
    }, {
      resources: '/api/brewing/sensors',
      permissions: ['get', 'put']
    }, {
      resources: '/api/brewing/sensors/:sensorId',
      permissions: ['get', 'put']
    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
