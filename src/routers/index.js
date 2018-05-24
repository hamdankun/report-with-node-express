const path = require('path');
const express = require('express');
const Sequelize = require('sequelize');
const logRouter = require('./log').default;

/**
 * Router express instance
 */
const app = express();

/**
 * Define root path
 */
const rootPath = path.dirname(require.main.filename || process.mainModule.filename) + '/src';

/**
 * Root router
 */
app.get('/', function(req, res) {
    return res.redirect('/report/graph?start=2017-01-01&end=2018-12-12');
});


/**
 * Set template engine
 */
app.set('view engine', 'ejs');
/**
 * Set path destination
 */
app.use(express.static(rootPath + '/views'));

/**
 * Define router log
 */
app.use('/report', logRouter);


exports.default = app;