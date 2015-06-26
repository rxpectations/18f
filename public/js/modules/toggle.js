/**
 * Toggle
 * ====
 * This module will render the Toggle component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of Toggle
 * @param element
 * @constructor
 */
var Toggle = function Toggle(element) {
  this.$elem = $(element);

  this.bind()
};

/**
 * Bind to relevant DOM events
 */
Toggle.prototype.bind = function() {
  this.$elem.on('click.Toggle', function() {
    var obj = $(this).attr('data-toggle');
    
    $('#' + obj).toggleClass('show');
  });

  this.$elem.on('click.Toggle', function(e) {
    e.preventDefault();
  });
};

module.exports = Toggle;
