/**
 * Toggle
 * ====
 * This module will render the Toggle component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of ToggleView
 * @param element
 * @constructor
 */
var ToggleView = function Toggle(element) {
  this.$elem = $(element);

  this.bind()
};

/**
 * Bind to relevant DOM events
 */
ToggleView.prototype.bind = function() {
  this.$elem.on('click.ToggleView', function() {
    var obj = $(this).attr('data-toggle');
    var type = $(this).attr('data-type');

    alert(obj);

    if(type != "undefined") {
      $('.toggle-select li a').removeClass('active');
      $('#' + type).find('a').addClass('active');    
    }
      
    if($(this).hasClass('content-switch')) {
      
    } else {
      $('#' + obj).toggleClass('show');
    }      
  });

  this.$elem.on('click.ToggleView', function(e) {
    e.preventDefault();
  });
};

module.exports = ToggleView;
