/**
 * Reactions
 * ====
 * This module will render the Reactions component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var slick = require('slick-carousel');

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
  this.$list = $('<div class="slider" />');
}
/**
 * Bind to relevant DOM events
 */
Reactions.prototype.bind = function() {

  $('body').bind('donutLoaded.rx', this.create.bind(this));
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
  console.log(event);
  var self = this;
  
  if (!data) {
    data = event;
  }
  this.setData(data);
  if (this.$el.find('.slider').length < 1)  {
    this.update(this.getData());
  }

};

/**
 * Called to update Reactions with new data
 * @param  {Object} data  New updated data
 */
Reactions.prototype.update = function(data) {
  var self = this;
  
  for (var event in data.results) {
    this.$list.append('<div data-term="'+data.results[event].term+'">'+self.toTitleCase(data.results[event].term)+'</div>');
  }

  this.$el.find('.chart-container').append(this.$list);
  this.slider = this.$el.find('.slider').slick({
    centerMode: true,
    slidesToShow: 3,
    prevArrow: $('.slick-prev'),
    nextArrow: $('.slick-next'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  });

  this.onSlideAfter();
  this.slider.on('afterChange', self.onSlideAfter.bind(self));
/*
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

  this.slider.goToSlide(0);*/
  
};
Reactions.prototype.onSlideAfter = function(event, slick, currentSlide) {
  var $slide = $('.slick-center');
  $('body').trigger('eventSelect.rx', {term: $slide.data('term')});
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

Reactions.prototype.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
module.exports = Reactions;
