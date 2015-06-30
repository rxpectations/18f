'use strict';

var Q = require('q');
var config = require('../support/config');
var utils = require('../support/utils');
var sync = utils.sync;

module.exports = function (browser) {
  // browser.sendKeyUp = sendKeyUp;

  function showBrowser () {
    return browser;
  }

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

    return browser.url(location).call(cb);
  };

  /**
  * Search for a term using the Search bar
  * @param string term
  */
  function search (term, cb) {
    var searchButton = '#searchButton';
    var searchField = '#searchField';

    browser.waitFor(searchButton, 6000, function waitForSearch () {
      browser.click(searchButton, function clickSearchButton () {
        browser.waitFor(searchField, 6000, function waitForSearch () {
          browser.setValue(searchField, term, cb);
        });
      });
    });
  };

  /**
  * Checks for searchResults
  * @param string term
  * @param function cb
  */
  function checkResults (term, cb) {
    var searchResults = '.search-results';
    browser.waitFor(searchResults, 5000, function () {
      browser.getText(searchResults, function(err, text) {
        var exp = new RegExp(term, 'ig');
        utils.expect(err).to.be.undefined;
        utils.expect(text).to.match(exp);
        cb();
      });
    });
  }

  function clickLink (link, cb) {
    var link = 'a[href="/events/' + link + '"]';
    browser.waitFor(link, 5000, function waitForLinkText () {
      browser.click(link, function clickLinkText () {
        cb();
      });
    });
  }

  function checkHtml (tag, html, cb) {
    browser.getText(tag, function(err, result) {
      utils.expect(err).to.be.undefined;
      utils.expect(result).to.equal(html);
      cb();
    });
  }

  return {
    showBrowser: showBrowser,
    visit: visit,
    search: search,
    checkResults: checkResults,
    clickLink: clickLink,
    checkHtml: checkHtml
  };
};
