const express = require('express');

const LogController = require('./../controllers/LogController').default;

const app = express();

/**
 * Report by device
 */
app.get('/device', LogController.device);

/**
 * Report by reange date
 */
app.get('/range-date', LogController.rangeDate);

/**
 * Display with graph
 */
app.get('/graph', LogController.graph);


exports.default = app;