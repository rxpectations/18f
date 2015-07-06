/**
 * Adverse Events
 * ====
 * This module will render all adverse events component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var dust = require('dustjs-linkedin');
require('../../../node_modules/dustjs-linkedin/lib/compiler.js');

/**
 * Create new instance of Adverse Events
 * @param element
 * @constructor
 * @param rawData
 */
var AdverseEvents = function AdverseEvents(element) {

  this.$el = $(element);
  this.$container = $('.adverse-events-container');
  
  
  this.init();
  
  this.bind();
};

/**
 * Initialize Adverse Results. This will prepare the dust template
 */
AdverseEvents.prototype.init = function() {
  var self = this;
  $.ajax({
    url: '/dust/getTemplate?path=modules/adverse-events',
    type: 'get',
    success: self.loadTemplate.bind(self),
    error: self.error.bind(self)
  });
};

/**
 * Fired when on ajax success event
 * Loads dust template for adverse results
 */
AdverseEvents.prototype.loadTemplate = function(data, callback) {
  console.log('loadTemplate AdverseEvents');
  this.compiledTemplate = dust.compile(data, 'adverse-events'); 
  dust.loadSource(this.compiledTemplate);
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

  var route = '/integrations/openFDA/events?drug='+$('header').data('name')+'&mode=all';
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
AdverseEvents.prototype.success = function(response, status, xhr) {
  var self = this;

  console.log('this is the response');
  console.log(response);

  
  //TODO: Load Dust template with adverse-events and show modal
  // this.compiledTemplate = dust.compile(response, 'results'); 
  // dust.loadSource(this.compiledTemplate);
  dust.render('adverse-events', response, function(err, out){
    if(err) console.error(err);
    self.$container.html(out);
  });
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
