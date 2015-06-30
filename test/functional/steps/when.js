'use strict';

module.exports = function () {
  this.World = require('../support/world');

  this.When(/^I enter "([^"]*)" into the search$/, function (term, done) {
    this.ui().search(term, done);
  });
};
