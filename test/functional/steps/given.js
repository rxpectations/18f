'use strict';

module.exports = function () {
  this.World = require('../support/world');

  this.Given(/^I want to search for known data$/, function (done) {
    var options = {
        url: '/',
        local: true
    };

    this.ui().visit(options, done)
  });
};
