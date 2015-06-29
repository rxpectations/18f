'use strict';

var $ = require('jquery');
var Chart = require('./modules/chart');
var Donut = require('./modules/donut');
var Bar = require('./modules/bar');

/* When DOM ready initialize modules */

$(function() {

  /* Generic inits. These are just baselines, they have no extended logic */

  $('.accordion').each(function instantiateAccordion() {
    var instance = new Accordion(this);
  });


  $('.line-chart').each(function instantiateLineChart() {

    new Chart(this);
  });

  $('.donut-chart').each(function instantiateDonutChart() {

    new Donut(this);
  });
  $('.bar-chart').each(function instantiateBarChart() {

    new Bar(this);
  });


  $.ajax({
    //url: '/integrations/openFDA/eventsByYears?drug='+$('header').data('name')+'&mode=name&year=2011',
    url: '/static/events',
    type: 'get',
    beforeSend: function beforeSend() {
      $('body').trigger('start.ajax');
    },
    success: function success(response) {
      $('body').trigger('incidentData', response);
      $('body').trigger('end.ajax');
    },
    error: function error(xhr, status, thrownError) {
      var response = {'error': 'No data found'}
      $('body').trigger('incidentData', response);
      $('body').trigger('end.ajax');
    }
  });

  $.ajax({
    //url: '/integrations/openFDA/recall?drug='+$('header').data('name')+'&mode=name',
    url: '/static/events',
    type: 'get',
    beforeSend: function beforeSend() {
      $('body').trigger('start.ajax');
    },
    success: function success(response) {
      $('body').trigger('recallData', response);
      $('body').trigger('end.ajax');
    },
    error: function error(xhr, status, thrownError) {
      var response = {'error': 'No data found'}
      $('body').trigger('recallData', response);
      $('body').trigger('end.ajax');
    }
  });

  

});
