/**
 * Chart
 * ====
 * This module will render the chart component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var d3 = require('d3');

/**
 * Create new instance of Chart
 * @param element
 * @constructor
 * @param rawData
 */
var Chart = function Chart(element) {

  this.$el = $(element);
  this.init();
  this.bind();
};

/**
 *  Initialize the chart with basic attributes
 * 
 */
Chart.prototype.init = function() {
  this.width = this.$el.width();
  this.height = this.$el.height();
  this._d3Configs = {};
  this._d3Configs.parseDate = d3.time.format('%Y').parse;

  this._d3Configs.x = d3.time.scale()
    .range([0, this.width]);

  this._d3Configs.y = d3.scale.linear()
    .range([this.height, 0]);

  this._d3Configs.color = d3.scale.category10();

  this._d3Configs.xAxis = d3.svg.axis()
    .scale(this._d3Configs.x)
    .orient('bottom');

  this._d3Configs.line = d3.svg.line();

  this.svg = d3.select(this.$el[0])
    .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
    .append('g')
        .attr('transform', 
              'translate(0,0)');


}
/**
 * Bind to relevant DOM events
 */
Chart.prototype.bind = function() {

  $('body').bind('incidentData', this.update.bind(this));
};

/**
 * Called to update chart with new data
 * @param  {Object} event Can be `data` if called directly
 * @param  {Object} data  New updated data
 */
Chart.prototype.update = function(event, data) {

  var self = this;

  if (!data) {
    data = event;
  }

  //get x domain
  this._d3Configs.line
    .x(function(d) { return self._d3Configs.x(d.year) })
    .y(function(d) { return self._d3Configs.y(d.total) });

  this._d3Configs.color.domain(d3.keys(data.results[0]).filter(function(key) { return key !== 'year'; }));

  data.results.forEach(function(d) {
    d.year = self._d3Configs.parseDate(d.year);
  });
/*
  var series = color.domain().map(function(total) {
    return {
      total: total,
      values: data.map(function(d) {
        return {year: d.year, incident: +d.total };
      })
    };
  });*/
  this._d3Configs.x.domain(d3.extent(data.results, function(d){ return d.year; }));

  this._d3Configs.y.domain([0, d3.max(data.results, function(d) { return d.total; })]);

  this.svg.append('path')
    .attr('class', 'line')
    .attr('d', this._d3Configs.line(data.results));

  // Add the X Axis
  this.svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(this._d3Configs.xAxis);

};

/**
 * Iterates over data properties passing to updateProperty method to apply
 * @param {Object}   data
 * @param {Function} callback
 */

module.exports = Chart;
