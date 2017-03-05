'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Sensor = mongoose.model('Sensor'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a sensor
 */
exports.create = function (req, res) {
  var sensor = new Sensor(req.body);
  sensor.updated = Date.now;

  sensor.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sensor);
    }
  });
};

/**
 * Show the current sensor
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var sensor = req.sensor ? req.sensor.toJSON() : {};

  res.json(sensor);
};

/**
 * Update a sensor
 */
exports.update = function (req, res) {
  var sensor = req.sensor;

  sensor.value = req.body.value;
  sensor.updated = Date.now;

  sensor.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sensor);
    }
  });
};

/**
 * Delete a sensor
 */
exports.delete = function (req, res) {
  var sensor = req.sensor;

  sensor.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sensor);
    }
  });
};

/**
 * List of Sensors
 */
exports.list = function (req, res) {
  Sensor.find().sort('-updated').exec(function (err, sensors) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sensors);
    }
  });
};

/**
 * Sensor middleware
 */
exports.sensorByID = function (req, res, next, id) {

  Sensor.findOne({'sensorId': id}).exec(function (err, sensor) {
    if (err) {
      return next(err);
    } else if (!sensor) {
      return res.status(404).send({
        message: 'No sensor with that identifier has been found'
      });
    }
    req.sensor = sensor;
    next();
  });
};
