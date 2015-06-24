/**
 * Search Results
 * ====
 * This module will render the search results component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var dust = require('dustjs-linkedin');
require('../../../node_modules/dustjs-linkedin/lib/compiler.js');


/**
 * Create new instance of SearchResults
 * @param element
 * @constructor
 * @param rawData
 */
var SearchResults = function SearchResults(element) {

  this.$el = $(element);  
  this.init();
  this.bind();
};

/**
 * Initialize Search Results. This will prepare the dust template
 */
SearchResults.prototype.init = function() {
  var self = this;
  $.ajax({
    url: '/dust/getTemplate?path=modules/search-results',
    type: 'get',
    success: self.loadTemplate.bind(self),
    error: self.error.bind(self)
  });
};

SearchResults.prototype.loadTemplate = function(data, status, xhr) {
  console.log('loadTemplate');
  this.compiledTemplate = dust.compile(data, 'search-results'); 
  dust.loadSource(this.compiledTemplate);
};


/**
 * Bind to relevant DOM events
 */
SearchResults.prototype.bind = function() {
  $('body').bind('search.rx', this.update.bind(this));
};

/**
 * Fired on element emitting 'search.rx' event
 * @param {Object} e
 */
SearchResults.prototype.update = function(e, eventData) {
  var self = this;
  dust.render('search-results', eventData, function(err, out){
    if(err) console.error(err);
    self.$el.html(out);
  });
};

/**
 * Called on error during async request with service.
 * In this instance this will report no results
 * @param  {object} xhr
 * @param  {Object} ajaxOptions
 * @param  {Object} thrownError Instance of Error
 */
SearchResults.prototype.error = function(xhr, ajaxOptions, thrownError) {
  console.error(xhr.status);
  console.error(thrownError);

};

module.exports = SearchResults;
