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
    units: {
        type: String,
        default: "Undefined Units",
        required: 'Sensor units cannot be undefined'
    },
    minValue: {
        type: Number,
        default: 0,
        required: 'Sensor must have minimum value defined'
    },
    maxValue: {
        type: Number,
        default: 0,
        required: 'Sensor must have maximum value defined'
    },
    value: {
        type: Number,
        min: -500,
        max: 500,
        default: 0,
        required: 'Sensor Value cannot be blank'
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Sensor', SensorSchema);