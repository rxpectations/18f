/**
 * Line Chart
 * ====
 * This module will render the line chart component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var d3 = require('d3');

/**
 * Create new instance of Line Chart
 * @param element
 * @constructor
 * @param rawData
 */
var Line = function Line(element) {

  this.$el = $(element);
  this.init();
  this.bind();
};

/**
 *  Initialize the line chart with basic attributes
 * 
 */
Line.prototype.init = function() {
  this.width = this.$el.width();
  this.height = this.$el.height();
  this.margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  }
  

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
Line.prototype.bind = function() {

  $('body').bind('incidentData', this.update.bind(this));
};

/**
 * Called to update chart with new data
 * @param  {Object} event Can be `data` if called directly
 * @param  {Object} data  New updated data
 */
Line.prototype.update = function(event, data) {

  var self = this;

  if (!data) {
    data = event;
  }

  var results = [];
  var years = [];
  for (var r in data.results) {
    if (!(data.results[r].total < 0)) {
      results.push(data.results[r]);
      years.push(data.results[r].year);
    } 
  }

  console.log(years);

  results.sort(function(a,b) {
    return a.year-b.year
  });
  console.log(results);

  this._d3Configs = {};

  this._d3Configs.x = d3.scale.linear()
    .range([this.margin.left, this.width - this.margin.right])
    //.domain([d3.min(results, function(d) { return d.year; }), d3.max(results, function(d) { return d.year; })]);
    .domain([2011,2015]);

  this._d3Configs.y = d3.scale.linear()
    .range([this.height - this.margin.top, this.margin.bottom])
    .domain([d3.min(results, function(d) { return d.total; })-50, d3.max(results, function(d) { return d.total; })+50]);

  this._d3Configs.color = d3.scale.category10();

  this._d3Configs.xAxis = d3.svg.axis()
    .scale(this._d3Configs.x)
    .ticks(5)
    .tickFormat(function(d) { return d;});

  this._d3Configs.line = d3.svg.line()
    .x(function(d) { console.log(self._d3Configs.x(d.year)); return self._d3Configs.x(d.year) })
    .y(function(d) { console.log(self._d3Configs.y(d.total));  return self._d3Configs.y(d.total) });

  this.circlesGroup = this.svg.append('svg:g');

  this.circles = this.circlesGroup.selectAll('.data-point')
    .data(results);

  this.circles
    .enter()
      .append('svg:circle')
        .attr('class', 'data-point')
        .style('opacity', 1)
        .attr('cx', function(d) { return self._d3Configs.x(d.year) })
        .attr('cy', function(d) { return self._d3Configs.y(d.total) })
        .attr('r', 4);
        

  this.svg.append('path')
    .attr('class', 'line')
    .attr('d', this._d3Configs.line(results));

  // Add the X Axis
  this.svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + (this.height - this.margin.bottom) + ')')
    .call(this._d3Configs.xAxis);

  this.svg.selectAll('.tick').selectAll('text').each(function highlightNullYear() {
    if (years.indexOf(this.textContent) < 0) {
      d3.select(this).classed('nodata', true);
    }
  });

};

/**
 * Iterates over data properties passing to updateProperty method to apply
 * @param {Object}   data
 * @param {Function} callback
 */

module.exports = Line;
