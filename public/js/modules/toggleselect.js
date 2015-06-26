/**
 * Toggle
 * ====
 * This module will render the Toggle component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of ToggleSelect
 * @param element
 * @constructor
 */
var ToggleSelect = function Toggle(element) {
  this.$elem = $(element);
  this.$toggle = this.$elem.find('li');
  this.$toggleItems = this.$elem.find('li a');

  this.bind()
};

/**
 * Bind to relevant DOM events
 */
ToggleSelect.prototype.bind = function() {
  this.$toggle.on('click.ToggleSelect', function clickToggleSelect() {
    if(!$(this).children('a').hasClass('active')) {
  		$('.toggle-select li a').removeClass('active');
    	$(this).find('a').addClass('active');
    }
  });

  this.$elem.on('click.ToggleSelect', function elemClickToggleSelect(e) {
    e.preventDefault();
  });
};

module.exports = ToggleSelect;
