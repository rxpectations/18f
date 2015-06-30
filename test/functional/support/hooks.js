'use strict';

var Hook = function () {
  var browser;

  this.Before(function (done) {
    browser = this.ui().showBrowser();
    done();
  });

  this.AfterFeatures(function (evt, done) {
    browser.end();
    done();
  });

  this.AfterScenario(function (evt, done) {
    browser.close();
    done();
  });
};

module.exports = Hook;
