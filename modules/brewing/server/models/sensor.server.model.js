'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sensor Schema
 */
var SensorSchema = new Schema({
  sensorId: {
    type: Number,
    min: 1,
    default: 1,
    required: 'Sensor ID cannot be blank'
  },
  name: {
    type: String,
    default: 'Un-named sensor',
    required: 'Sensor Name cannot be blank'
  },
  value: {
    type: Number,
    min: 0,
    default: 0,
    required: 'Sensor Value cannot be blank'
  },
  updated: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('Sensor', SensorSchema);
