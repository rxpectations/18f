/**
 * Toggle
 * ====
 * This module will render the Toggle component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var jAddress = require("../vendor/jquery.address.js");

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
    var obj = $(this).attr('data-toggle'),
        type = $(this).attr('data-type'),
        btnTxt = $(this).text();

    if(type != "undefined") {
      $('.toggle-select li a').removeClass('active');
      $('#' + type).find('a').addClass('active');    
    }
      
    if($(this).hasClass('content-switch')) {
      $('#' + obj + ' .graph').toggleClass('show');
      if(btnTxt === "View All Reactions") {
        $(this).text('View Top 10 Reactions');
      } else {
        $(this).text('View All Reactions');  
      }

    } else {
      //$('#' + obj).toggleClass('show');
      
      if($('#search-toggle').hasClass('show')){
        $('.search-bar input').focus();
      } else {
        $('.search-bar input').blur();
      }   
    }
  });

  this.$elem.on('click.ToggleView', function(e) {    
    e.preventDefault();
  });
};

$.address.change(function(event) {
  if(event.value == "/") {
    $('#search-toggle').removeClass('show'); 
  } else if(event.value == "/search") {
    $('#search-toggle').addClass('show'); 
  }
});



module.exports = ToggleView;
