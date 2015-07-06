'use strict';

var $ = require('jquery');
var Search = require('./modules/search');
var SearchResults = require('./modules/search-results');
var Accordion = require('./modules/accordion');
var ToggleView = require('./modules/toggleview');
var ToggleSelect = require('./modules/toggleselect');
var Tabs = require('./modules/tabs');
var DrugApprovals = require('./modules/drug-approvals');

/* When DOM ready initialize modules */

$(function() {

  /* Generic inits. These are just baselines, they have no extended logic */

  $('form.search').each(function instantiateSearch() {

    new Search(this);
  });

  $('.results').each(function instantiateSearchResults() {

    new SearchResults(this);
  });

  $('.accordion').each(function instantiateAccordion() {
    var instance = new Accordion(this);
  });

  $('.toggle-view').each(function instantiateToggle() {
    var toggleview = new ToggleView(this);
  });

  $('.toggle-select').each(function instantiateToggleSelect() {
    var toggleselect = new ToggleSelect(this);
  });

  $('.tabs').each(function instantiateTabs() {
    var tabadoodledoo = new Tabs(this);
  });

  $('.drug-slider').each(function instantiateDrugApprovals() {
    var drugapprovals = new DrugApprovals(this);
  });

});
