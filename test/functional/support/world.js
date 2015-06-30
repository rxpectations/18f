'use strict';

var config = require('./config')
var makeUI = require('./ui');
var Q = require('q');
var webdriverjs = require('webdriverio');

module.exports = function (done) {
  try {

    var browser = webdriverjs.remote(config.options);

    browser.init();

    var ui = makeUI(browser);

    this.config = function () {
        return config;
    };

    this.ui = function () {
      return ui;
    };

    this.waitUntil = function (condition, msg, timeout) {
      var deferred = Q.defer();
      var start = Date.now();

      function evalCondition() {
        try {
          if (condition()) {
            deferred.resolve();
          } else if (timeout < (Date.now() - start)) {
            deferred.reject(
              new Error('Condition not met in ' + timeout + ' ms: ' + msg)
            );
          } else {
            setTimeout(evalCondition, 0);
          }
        } catch (err) {
          deferred.reject(err);
        }
      }
      evalCondition();

      return deferred.promise;
    };
    done();
  } catch (err) {
    done(err);
  }
};
