'use strict';

var chai = require('chai');
var expect = chai.expect;

module.exports = function() {
  this.World = require('../support/world');

  this.Then(/^I should get (\d+) results for "([^"]*)"$/,
    function (total, term, done) {
    // Write code here that turns the phrase above into concrete actions
    done.pending();
  });
};
