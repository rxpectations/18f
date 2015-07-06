/**
 * Adverse Events
 * ====
 * This module will render all adverse events component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of Adverse Events
 * @param element
 * @constructor
 * @param rawData
 */
var AdverseEvents = function AdverseEvents(element) {

  this.$el = $(element);
  
  this.init();
  
  this.bind();
};

/**
 * Bind to relevant DOM events
 */
AdverseEvents.prototype.bind = function() {
  this.$el.bind('click', this.clickEvent.bind(this));
};

/**
 * Fired on element emitting 'click' event
 * Makes ajax call to get adverse events
 * @param {Object} e
 */
AdverseEvents.prototype.clickEvent = function(e) {
  var self = this;

  var route = '/integrations/openFDA/events?drug='+self.term+'&mode=all';
  $.ajax({
    url: route || '/',
    type: 'get',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: self.success.bind(self),
    error: self.error.bind(self)
  });
  
};
/**
 * Called on successful response from GET route. Emits success event and
 * updates result pane.
 * @param  {object} response Raw HTTP response data
 */
AdverseEvents.prototype.success = function(response) {

  var self = this;

  //TODO: Load Dust template with adverse-events and show modal
  // Refer to chart-bar or search results for loading dust templates
  $('body').trigger('adverseEvents.rx', response);

};

/**
 * Called on error during async request with service.
 * In this instance this will report no results
 * @param  {object} xhr
 * @param  {Object} ajaxOptions
 * @param  {Object} thrownError Instance of Error
 */
AdverseEvents.prototype.error = function(xhr, ajaxOptions, thrownError) {
  console.error(xhr.status);
  console.error(thrownError);
  $('body').trigger('adverseEvents.rx', response);

};

module.exports = AdverseEvents;
