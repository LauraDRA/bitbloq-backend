/* global process */
/**
 * Main application file
 */

'use strict';


require('dotenv').config({
    path: 'app/res/config/.env'
});


var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./res/config/config'),
    http = require('http');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error : ' + err);
    process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) {
    require('./res/seed');
}

// Setup server
var app = express(),
    server = http.createServer(app);

require('./express')(app);
require('./routes')(app);

// Start server
function startServer() {
    server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;