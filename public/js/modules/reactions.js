/**
 * Reactions
 * ====
 * This module will render the Reactions component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var slick = require('slick-carousel');
var numeral = require('numeral');

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
  var i = 0
  for (var event in data.events) {
    var percent = numeral(data.events[event].count / data.total).format('0.00%');
    this.$list.append('<div data-term="'+data.events[event].term+'">' +
      '<div class="c'+i+'">' + 
      '<p class="reaction-percent">'+percent+'</p>' +
      '<p class="reaction-name"><strong>'+self.toTitleCase(data.events[event].term)+'</strong></p>'+
      '</div></div>'
    );
    i++;
  }

  this.$el.find('.chart-container').append(this.$list);
  this.slider = this.$el.find('.slider').slick({
    centerMode: true,
    slidesToShow: 3,
    prevArrow: $('.slick-prev'),
    nextArrow: $('.slick-next'),
    focusOnSelect: true,
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

  this.onSlideAfter(null, null, 0, 0);
  this.slider.on('beforeChange', self.onSlideAfter.bind(self));
  this.slider.find('.slick-slide').not('.slick-center').each(function() {
    self.truncateName($(this));
  });
  
};
Reactions.prototype.onSlideAfter = function(event, slick, currentSlide, nextSlide) {
  console.log(currentSlide, nextSlide);
  this.truncateName($('[data-slick-index="'+currentSlide+'"]'));
  var $slide = $('[data-slick-index="'+nextSlide+'"]');
  this.fullName($slide);
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

Reactions.prototype.truncateName = function(element) {
  var self = this;

  var $slide = element;
  var term = this.toTitleCase($slide.data('term'));
  var truncatedString = term.substring(0, Math.min(19,term.length));
  if (term.length == Math.min(term.length, 19)) {
    $slide.find('.reaction-name strong').html(term);
  } else {
    $slide.find('.reaction-name strong').html(truncatedString + '&hellip;');
  }
}

Reactions.prototype.fullName = function(element) {
  var self = this;

  var $slide = element;
  var term = this.toTitleCase($slide.data('term'));
  $slide.find('.reaction-name strong').html(term);
}


Reactions.prototype.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
module.exports = Reactions;
