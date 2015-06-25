'use strict';

var chai = require('chai');
var expect = chai.expect;

module.exports = function() {
  this.World = require('../support/world');

  this.Then(/^I should get results for "([^"]*)"$/, function (term, done) {
    this.ui().checkResults(term, done);
  });
};
