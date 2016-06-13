'use strict';

var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    _id: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: false,
        required: true
    },
    token: String,
    createdAt: {
        type: Date,
        expires: 7200,
        default: Date.now
    }
});


/**
 * Pre-save hook
 */

TokenSchema.pre('save', function(next) {
    this._id = this.userId;
    this.userId = undefined;
    next();
});


module.exports = mongoose.model('Token', TokenSchema);
