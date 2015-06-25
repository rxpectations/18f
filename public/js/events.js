'use strict';

var $ = require('jquery');
var Chart = require('./modules/chart');

/* When DOM ready initialize modules */

$(function() {

  /* Generic inits. These are just baselines, they have no extended logic */

  $('.accordion').each(function() {
    var instance = new Accordion(this);
  });


  $('.line-chart').each(function() {

    new Chart(this);
  });


  $.ajax({
    url: '/integrations/openFDA/eventsByYears?drug='+$('header').data('name')+'&mode=name&year=2011',
    //url: '/fakeData',
    type: 'get',
    beforeSend: function() {
      $('body').trigger('start.ajax');
    },
    success: function(response) {
      $('body').trigger('incidentData', response);
      $('body').trigger('end.ajax');
    },
    error: function(xhr, status, thrownError) {
      var response = {'error': 'No data found'}
      $('body').trigger('incidentData', response);
      $('body').trigger('end.ajax');
    }
  });

  

});
