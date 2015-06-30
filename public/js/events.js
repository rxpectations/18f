'use strict';

var $ = require('jquery');
var Line = require('./modules/chart-line');
var Donut = require('./modules/chart-donut');
var Bar = require('./modules/chart-bar');
var Reactions = require('./modules/reactions');

/* When DOM ready initialize modules */
$(function() {

  /* Generic inits. These are just baselines, they have no extended logic */

  $('.accordion').each(function instantiateAccordion() {
    var instance = new Accordion(this);
  });

  $('.line-chart').each(function instantiateLineChart() {

    new Line(this);
  });

  $('.donut-chart').each(function instantiateDonutChart() {

    new Donut(this);
  });
  $('.bar-chart').each(function instantiateBarChart() {

    new Bar(this);
  });

  $('.reactions').each(function instantiateReactions() {

    new Reactions(this);
  });

  $.ajax({
    //url: '/integrations/openFDA/recall?drug='+$('header').data('name')+'&mode=name',
    url: '/testingAPI?term='+$('header').data('name'),
    type: 'get',
    beforeSend: function beforeSend() {
      $('body').trigger('start.ajax');
    },
    success: function success(response) {
      $('body').trigger('eventData', response);
      $('body').trigger('end.ajax');
    },
    error: function error(xhr, status, thrownError) {
      var response = {'error': 'No data found'}
      $('body').trigger('eventData', response);
      $('body').trigger('end.ajax');
    }
  });

  $('body').on('eventSelect.rx', function GetEventData(event, eventData){
    console.log(eventData.term);
    var url = '/integrations/openFDA/eventCountByName/?mode=name&drug=' +
              $('header').data('name') +
              '&drugevent=' + eventData.term;
    //Get the term from the event data and do ajax call to get data from last 5 years
    $.ajax({
      url: url,
      //url: '/static/events?term='+eventData.term,
      type: 'get',
      beforeSend: function beforeSend() {
        $('body').trigger('start.ajax');
      },
      success: function success(response) {
        console.log(response);
        $('body').trigger('effectData', response);
        $('body').trigger('end.ajax');
      },
      error: function error(xhr, status, thrownError) {
        var response = {'error': 'No data found'}
        $('body').trigger('effectData', response);
        $('body').trigger('end.ajax');
      }
    });
  });

  

});
     
