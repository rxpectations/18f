/**
 * Reactions
 * ====
 * This module will render the Reactions component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var bxSlider = require('../vendor/jquery.bxslider.min');

/**
 * Create new instance of Reactions
 * @param element
 * @constructor
 * @param rawData
 */
var Reactions = function Reactions(element) {

  this.$el = $(element);
  this.legend = (this.$el.data('legend'))?this.$el.data('legend'):false;
  this.init();
  this.bind();
};

/**
 *  Initialize the Reactions with basic attributes
 * 
 */
Reactions.prototype.init = function() {
  this.$list = $('<ul />');
}
/**
 * Bind to relevant DOM events
 */
Reactions.prototype.bind = function() {

  $('body').bind('eventData', this.create.bind(this));
  $(window).resize(function windowResize() {
    //this.update(this.getData());
  });
};

/**
 * Called to initialize data
 * @param  {Object} event Can be `data` if called directly
 * @param  {Object} data  New updated data
 */
Reactions.prototype.create = function(event, data) {

  var self = this;
  
  if (!data) {
    data = event;
  }
  this.setData(data);

  this.update(this.getData());

};

/**
 * Called to update Reactions with new data
 * @param  {Object} data  New updated data
 */
Reactions.prototype.update = function(data) {
  var self = this;
  console.log(data);
  for (var event in data.results) {
    this.$list.append('<li data-term="'+data.results[event].term+'">'+data.results[event].term+'</li>');
  }

  this.$el.append(this.$list);

  this.slider = this.$el.find('ul').bxSlider({
    slideWidth: 100,
    minSlides: 3,
    maxSlides: 3,
    moveSlides: 1,
    startSlide: 9,
    hideControlOnEnd: true,
    pager:false,
    onSlideAfter: self.onSlideAfter.bind(self)
  });

  this.slider.goToSlide(0);
  
};
Reactions.prototype.onSlideAfter = function($slide, oldIndex, newIndex) {
  $('body').trigger('termSelect.rx', {term: $slide.data('term')});
}

/**
 * Getter method for Reactions data
 */
Reactions.prototype.getData = function() {
  return this.data;
}

/**
 * Setter method for Reactions data
 * @param {Object}   data
 */
Reactions.prototype.setData = function(data) {
  if (!this.data) {
    this.data = data;
  }
}

module.exports = Reactions;
