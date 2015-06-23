'use strict';

var Q = require('q');
var config = require('../support/config');
var utils = require('../support/utils');
var sync = utils.sync;

module.exports = function (browser) {
  // browser.sendKeyUp = sendKeyUp;

  /**
  * Visit a page in the browser
  * @param string page
  * @param boolean local
  */
  function visit (options, cb) {
    var location = options.url;

    if(options.local) {
      location = config.baseURL + options.url;
    }

    console.log(location);
    return browser.url(location).call(cb);
  };

  /**
  * Search for a term using the Search bar
  * @param string term
  */
  function search (term, cb) {
    browser.waitFor('#apiSearch', 2000, function () {
      browser.setValue('#apiSearch', term, cb);
   });
  };

  return {
    visit: visit,
    search: search
  };
};
