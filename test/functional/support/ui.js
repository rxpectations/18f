'use strict';

var Q = require('q');
var config = require('../support/config');
var utils = require('../support/utils');
var sync = utils.sync;

module.exports = function (browser) {
  // browser.sendKeyUp = sendKeyUp;

  /**
  * Getting the data from back end
  * @param string page
  * @param boolean local
  */
  function visit (page, local) {
    var location = page;

    if(local) {
      location = config.baseURL + page;
    }

    console.log(location);

    return browser.visit(location);
  };

  return {
    visit: visit
  };
};
