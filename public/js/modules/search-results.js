/**
 * Search Results
 * ====
 * This module will render the search results component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var dust = require('dustjs-helpers');

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
 *  Initialize the search results with basic attributes
 * 
 */
SearchResults.prototype.init = function() {
  
}
/**
 * Bind to relevant DOM events
 */
SearchResults.prototype.bind = function() {
  this.$el.find('#apiSearch').bind('keyup', this.keyupEvent.bind(this));
};

/**
 * Fired on element emitting 'keyup' event
 * @param {Object} e
 */
SearchResults.prototype.keyupEvent = function(e) {
  var self = this;
  if(this.timer) {
    clearTimeout(this.timer);
  }

  this.timer = setTimeout(function() {
    // Create url
    var route = '/integrations/openFDA/?term='+$(e.currentTarget).val()+'&mode=all';
    console.log('make request after 250 milliseconds of typing');
    console.log(route);
    
    $.ajax({
      url: route || '/',
      type: 'get',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: self.success.bind(self),
      error: self.error.bind(self)
    });
  }, 250);
  
};
/**
 * Called on successful response from GET route. Emits success event and
 * updates result pane.
 * @param  {object} response Raw HTTP response data
 */
SearchResults.prototype.success = function(response) {

  var self = this;
  console.log(response);
  $('body').trigger('search.rx', response);
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
  $('body').trigger('search.rx', response);

};

module.exports = Search;
