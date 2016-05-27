'use strict';

var mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
    message: String,
    os: String,
    browser: String,
    userAgent: String,
    userInfo: {}
}, {
    timestamps: true
});


module.exports = mongoose.model('Feedback', FeedbackSchema);
