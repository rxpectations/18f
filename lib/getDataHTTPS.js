'use strict';

/**
 * Dependencies
 * @type {Object} https  Core Module
 * @type {Object} _  Lodash utility library
 */
var https = require('https');
var _ = require('lodash');

/**
 * Default options for module
 * @type {Object}
 */
var options = {
    // Pass option as false to not repeat calls
    timer: 20000
};

var Getter = function () {

    /**
     * Constructor
     * @param {String|Object}   url See core https module documentation for options
     * @param {Function} cb  Callback to be called on Stream end event
     */
    function Getter (url, opt, cb) {
        // Default options
        this.options = options;

        this.url = url;
        this.cb = (typeof opt === 'function') ? opt : cb;

        // Extend options if provided
        this.options = (typeof opt === 'object') ?
            _.extend(this.options, opt) : this.options;
        console.log(url);
        this.get();
    }

    /**
     * Initiates request from service
     * @api private
     */
    Getter.prototype.get = function() {
        this.raw = '';
        this.connection = https.get(this.url, this.handler.bind(this))
            .on('error', this.errorHandler.bind(this));
    };

    /**
     * Primary handler for GET call
     * @param  {Object} res
     */
    Getter.prototype.handler = function(res) {
        res.on('data', this.streamHandler.bind(this));
        res.on('end', this.endHandler.bind(this));
    };

    /**
     * Raw Stream event handler
     * @param  {String} chunk Buffer data
     */
    Getter.prototype.streamHandler = function(chunk) {
        this.raw += chunk.toString();
    };

    /**
     * Called when stream ends, raw data passed to callback
     */
    Getter.prototype.endHandler = function() {
        this.connection.destroy();
        this.cb(null, this.raw);
        this.cycle();
    };

    /**
     * Error event handler
     * @param  {Object} err Error object
     */
    Getter.prototype.errorHandler = function(err) {
        if(typeof this.cb  === 'function') {
            this.cb(err);
        }
        this.cycle();
    };

    Getter.prototype.cycle = function() {
        // If the timer is not set to false, set a timeout
        // for next call to service
        if (this.options.timer && typeof this.options.timer === 'number') {
            setTimeout(this.get.bind(this), this.options.timer);
        }
    };

    return Getter;
};

module.exports = Getter();
