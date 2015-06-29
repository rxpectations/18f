/**
 * Bar
 * ====
 * This module will render the Bar Chart component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var d3 = require('d3');
var dust = require('dustjs-linkedin');
require('../../../node_modules/dustjs-linkedin/lib/compiler.js');

/**
 * Create new instance of Bar
 * @param element
 * @constructor
 * @param rawData
 */
var Bar = function Bar(element) {

  this.$el = $(element);
  this.init();
  this.bind();
};

/**
 *  Initialize the Bar with basic attributes
 * 
 */
Bar.prototype.init = function() {
  var self = this;
  this.width = this.$el.width();
  this.height = this.$el.height();
  this._d3Configs = {};
  this._d3Configs.color = d3.scale.ordinal()
    .range(d3.range(5).map(function(i) { 
      return "c" + i; 
    })
  );
  
  $.ajax({
    url: '/dust/getTemplate?path=modules/bar-chart',
    type: 'get',
    success: self.loadTemplate.bind(self),
    error: self.error.bind(self)
  });

};

/**
 * Fired when on ajax success event
 * Loads dust template for search results
 */
Bar.prototype.loadTemplate = function(data, status, xhr) {
  var self = this;
  console.log('loadTemplate');
  this.compiledTemplate = dust.compile(data, 'bar-chart'); 
  dust.loadSource(this.compiledTemplate);

  if (this.data) {
    this.create(this.data);
  }
};

/**
 * Bind to relevant DOM events
 */
Bar.prototype.bind = function() {

  $('body').bind('incidentData', this.create.bind(this));
};

/**
 * Called to initialize data
 * @param  {Object} event Can be `data` if called directly
 * @param  {Object} data  New updated data
 */
Bar.prototype.create = function(event, data) {

  var self = this;
  
  if (!data) {
    data = event;
  }

  if (!this.data) {
    var results = this.formatData(data.results);
    this.setData(results);
  }

  if (this.compiledTemplate) {
    dust.render('bar-chart', {data: this.getData()}, function(err, out){
      if(err) console.error(err);
      self.$el.html(out);
    });    
    
    this.chart = d3.select(this.$el[0]).selectAll('.bar')
      .append('div')
      .attr('class', 'path');
    this.update(this.getData());
  }

};

/**
 * Called to update Bar with new data
 * @param  {Object} data  New updated data
 */
Bar.prototype.update = function(data) {
  var self = this;

  this._d3Configs.x = d3.scale.linear()
    .range([0, this.$el.find('.bar').width()])
    .domain([0, d3.max(data, function(d) { return d.count; })]);

  this.chart.data(data);

  this.chart.style('width', function(d) { 
      return self._d3Configs.x(d.count) + 'px';
    })
    .attr('class', function(d, i) {
      if (i >= 5) {
        return 'c4';
      } else {
        return self._d3Configs.color(d.count);
      }
    })
    .classed('path', true);

};

Bar.prototype.formatData = function(data) {
  //Sort data
  data.sort(function(a,b) {return b.year-a.year});
  //Iterate through each result in the array
  var events = [];
  for(var year in data) {
    //iterate through each event 
    console.log(data[year]);
    if ((data[year].events !== undefined) &&
      (data[year].events.length != 0)) {
      events = data[year].events;
      break;
    }
  }

  events.sort(function(a,b) {return b.count-a.count;});

  //Convert count to number if not number
  events.forEach(function(d) {
    d.count = +d.count;
  });

  return events;
}

/**
 * Getter method for Bar data
 */
Bar.prototype.getData = function() {
  return this.data;
}

/**
 * Setter method for Bar data
 * @param {Object}   data
 */
Bar.prototype.setData = function(data) {
  if (!this.data) {
    this.data = data;
  }
}
/**
 * Called on error during async request with service.
 * In this instance this will report no results
 * @param  {object} xhr
 * @param  {Object} ajaxOptions
 * @param  {Object} thrownError Instance of Error
 */
Bar.prototype.error = function(xhr, ajaxOptions, thrownError) {
  console.error(xhr.status);
  console.error(thrownError);

};
module.exports = Bar;
