'use strict';

var utils = require('../support/utils');
var startApp = utils.startApp;

module.exports = function () {
  this.World = require('../support/world');

  this.When(/^I search for "([^"]*)"$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
