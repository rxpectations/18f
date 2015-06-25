'use strict';

var $ = require('jquery');
var Chart = require('./modules/chart');
var Search = require('./modules/search');
var SearchResults = require('./modules/search-results');
var Accordion = require('./modules/accordion');

/* When DOM ready initialize modules */

$(function() {

  /* Generic inits. These are just baselines, they have no extended logic */

  $('form.search').each(function instantiateSearch() {

    new Search(this);
  });

  $('.results').each(function instantiateSearchResults() {

    new SearchResults(this);
  });

  $('.accordion').each(function() {
    var instance = new Accordion(this);
  });

  

});
