/**
 * Spinner
 * ====
 * This module will render the spinner component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var Spinner = require('spin.js');

/**
 * Create new instance of Spinner
 * @param element
 * @constructor
 */
var Spinner = function Accordion(element) {
  this.elem = $(element)[0];
  // Get each item in the accordion
  this.init();
};

Spinner.prototype.init = function() {
  var options = {
    lines: 13, // The number of lines to draw
    length: 28, // The length of each line
    width: 14, // The line thickness
    radius: 42, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000', // #rgb or #rrggbb or array of colors
    opacity: 0.25, // Opacity of the lines
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    position: 'absolute' // Element positioning
  }

  this.spinner = new Spinner(opts);
}

/**
 * Bind to relevant DOM events
 */
Spinner.prototype.bind = function() {
  $('body').bind('search.rx', this.hide.bind(this));
  $('body').bind('xhr.rx', this.hide.bind(this));
};

Spinner.prototype.hide = function() {
  this.spinner.stop();
}

Spinner.prototype.show = function() {
  this.spinner.spin();
}

module.exports = Spinner;
