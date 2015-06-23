'use strict';

module.exports = function () {
  this.World = require('../support/world');

  this.Given(/^I want to search google$/, function (done) {
    this.ui().visit('/styleguide', true).then(done, done);
  });
};
