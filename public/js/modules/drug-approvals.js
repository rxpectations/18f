/**
 * DrugApprovals
 * ====
 * This module will render the Drug Approvals component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var slick = require('slick-carousel');

/**
 * Create new instance of DrugApprovals
 * @param element
 * @constructor
 */
var DrugApprovals = function drugApprovals(element) {
  this.$elem = $(element);
  this.$slider = this.$elem.find('.drug-slider');
  this.$data;
  
  this.getData();
  this.bind();  
};

DrugApprovals.prototype.getData = function() {
  var url = "/integrations/feeds/?name=clinical-trials"; 

  $.getJSON( url, function( data ) {

    //add items to slider
    $.each( data.articles, function( i, item ) {
      //Get Information
      var title = data.articles[i].title,
          date = data.articles[i].pubDate.slice(0, - 13),
          desc = data.articles[i].description,
          href = data.articles[i].link;

      buildSlider(title, date, desc, href);

      if(i === data.articles.length - 1) {
        addSlider();
      }
    });
  });
};

buildSlider = function(title, date, desc, href) {
  var slider = $('.drug-slider'),
      title = title,
      date = date,
      desc = desc.substring(0,300),
      //desc = desc + " ... ",
      url = href;

  slider.append(
    "<div class='card'>" +
    "<div class='front'>" +
    "<h6 class='date'>" + date + "</h6>" +
    "<h5>" + title + "</h5>"+
    "</div>" +
    "<div class='back'>" +
    "<p>" + desc + " <a target='_blank' href='" + url +"'>More</a></p>" +
    "</div>" +
    "</div>"
  );

};

addSlider = function(){
  $('.drug-slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 820,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  });

  $('.drug-slider a').on('click', function(){
    window.open($(this).attr('href'));
  });
};

/**
 * Bind to relevant DOM events
 */
DrugApprovals.prototype.bind = function() {
  this.$elem.on('click.DrugApprovals', function() {

  });

  this.$elem.on('click.DrugApprovals', function(e) {
    e.preventDefault();
  });
};

module.exports = DrugApprovals;
