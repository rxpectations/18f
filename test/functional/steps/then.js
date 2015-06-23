'use strict';

var utils = require('../support/utils');
var sync = utils.sync;
var chai = require('chai');
var expect = chai.expect;


module.exports = function () {
  this.World = require('../support/world');

  this.Then(/^I get (\d+) results for funny cats$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
