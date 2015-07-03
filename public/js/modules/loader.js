/**
 * Loader
 * ====
 * This module will render the Loader component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of Loader
 * @param element
 * @constructor
 */
var Loader = function Loader(element) {
  console.log(element);
  this.$element = $(element);
  this.listenEvent = this.$element.data('listenevent') || undefined;

  if (!this.listenEvent) {
    throw new Error(
      'Loader requires a "listenevent" data attribute'
    );
  }
  // Get each item in the accordion
  this.bind();
};

/**
 * Bind to relevant DOM events
 */
Loader.prototype.bind = function() {
  $('body').bind(this.listenEvent+'.start.ajax', this.show.bind(this));
  $('body').bind(this.listenEvent+'.end.ajax', this.hide.bind(this));
};

/**
 * Shows the loader
 */
Loader.prototype.show = function() {
  this.$element.show();
};

/**
 * Hides the loader
 */
Loader.prototype.hide = function() {
  this.$element.hide();
};

module.exports = Loader;
