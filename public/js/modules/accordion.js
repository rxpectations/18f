/**
 * Accordion
 * ====
 * This module will render the accordion component
 * Inspired by
 * http://tympanus.net/codrops/2013/03/29/nested-accordion/
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of Accordion
 * @param element
 * @constructor
 */
var Accordion = function Accordion(element) {
  this.$elem = $(element);
  // Get each item in the accordion
  this.$items = this.$elem.find('.title'); 
  this.bind();
};

/**
 * Bind to relevant DOM events
 */
Accordion.prototype.bind = function Accordion() {
  this.$items.on('click.Accordion', function clickAccordion() {
    var $listItem = $( this ).parent();
    if ($listItem.hasClass('active')) {
        $listItem.removeClass('active');
    } 
    else {
        $listItem.siblings('.active').removeClass('active');
        $listItem.addClass('active');
        $body.scrollTop( $listItem.offset().top - $listItem.find('> .title').outerHeight() );
    }
  });

  this.$elem.find('.title > a').on('click.Title', function(e) {
    e.preventDefault();
  });
};

module.exports = Accordion;
