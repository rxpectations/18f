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
      if(i <= 10) {
        //Get Information
        var title = data.articles[i].title,
            date = data.articles[i].pubDate.slice(0, - 13),
            desc = data.articles[i].description,
            href = data.articles[i].link;

        buildSlider(title, date, desc, href);
      } else {
        addSlider();  
      }



      if(i === data.articles.length - 1) {
        
      }
    });
  });
};

buildSlider = function(title, date, desc, href) {
  var slider = $('.drug-slider'),
      title = title,
      date = date.substring(5),
      desc = desc.substring(0,300),
      //desc = desc + " ... ",
      url = href;

  slider.append(
    "<div class='card'>" +
    "<div class='front'>" +
    "<span class='flipper'><i class='fa fa-plus'></i></span>" +
    "<h6 class='date'>" + date + "</h6>" +
    "<h5><a target='_blank' href='" + url +"'>" + title + "</a></h5>" +
    "</div>" +
    "<div class='back'>" +
    "<span class='flipper'><i class='fa fa-minus'></i></span>" +
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
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 835,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      },
      {
        breakpoint: 767,
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

  //Fix bug in slider disabling click event
  $('.drug-slider a').on('click', function(){
    window.open($(this).attr('href'));
  });

  //Flip cards on click
  $('.drug-slider .card .flipper').bind('click', function(){
    var card = $(this).parent().parent();

    if(card.hasClass('flip')) {
      card.toggleClass('flip'); 
    } else {
      $('.drug-slider .card').removeClass('flip');
      card.toggleClass('flip');
    }    
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
