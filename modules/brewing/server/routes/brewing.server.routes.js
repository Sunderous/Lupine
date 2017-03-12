'use strict';

/**
 * Module dependencies
 */
var brewingPolicy = require('../policies/brewing.server.policy'),
    sensors = require('../controllers/brewing.server.controller');

module.exports = function(app) {
    // Sensors collection routes
    app.route('/api/brewing').all(brewingPolicy.isAllowed)
        .get(sensors.list);

    app.route('/api/brewing/sensors').all(brewingPolicy.isAllowed)
        .get(sensors.list)
        .post(sensors.create);

    // Single Sensor routes
    app.route('/api/brewing/sensors/:sensorId').all(brewingPolicy.isAllowed)
        .get(sensors.read)
        .put(sensors.update)
        .delete(sensors.delete);

    // Finish by binding the sensor middleware
    app.param('sensorId', sensors.sensorByID);
};