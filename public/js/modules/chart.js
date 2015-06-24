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
var Chart = function Chart(element, rawData) {

  this.$el = $(element);
  this.listenEvent = this.$el.data('listenevent') || undefined;
  if (!this.listenEvent) {
    throw new Error(
      'Chart require a "listenevent" data attribute'
    );
  }
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

  this._d3Configs.x = d3.scale.ordinal()
    .rangeRoundBands([0, this.width], 0, 0);

  this._d3Configs.y = d3.scale.linear()
    .range([this.width, 0]);

  this._d3Configs.xAxis = d3.svg.axis()
    .scale(this._d3Configs.x)
    .orient("top")
    .tickSize(18,0,0);


}
/**
 * Bind to relevant DOM events
 */
Chart.prototype.bind = function() {

  $('body').bind(this.listenEvent, this.update.bind(this));
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

  this.updateProperties(data, function onUpdateComplete() {

    //- self.$element.slideDown();
  });
};

/**
 * Iterates over data properties passing to updateProperty method to apply
 * @param {Object}   data
 * @param {Function} callback
 */
Chart.prototype.updateProperties = function (data, callback) {

  var self = this;

  // x domain will be configured using years within the dataset
  // x.domain(data.map(function(d) { return d.fiscalYear; }));
  self._d3Configs.x.domain();

  // y domain will be configured with a range of 0 to the max in dataset
  // y.domain([0, d3.max(data, function(d) {  return  d.total; })]);
  self._d3Configs.y.domain();

  self.svg = d3.select(self.$el)
    .attr('width', width);

  self.bar = self.svg.selectAll('a.bar-group') 
    .data(data)
    .enter()
    .append('a')
    .attr('class', 'bar-group')
    .style('min-width', function(d) {
      return x.rangeBand() + "px"
    })
    .on('click', function(d) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $('body').trigger('click.bc', [d]);
    });

  self.bar.append('div')
    .attr('class', 'bar')
    .style('height', function(d) {
        return height - y(d.total)+ 'px';
    })
    .style('background-color', function(d, i) {
        if (i >= colors.barColors.length) {
            return colors.barColors[i- colors.barColors.length];
        } else {
            return colors.barColors[i]
        }
    });

  self.bar.append('div')
    .attr('class', 'bar-text')
    .style('top', function(d) {
        return '0px';
    })
    .text(function(d) { 
      return format.number(d.total).toUpperCase(); 
    });

  // nextTick
  setTimeout(function () { return callback(); }, 0);
};


module.exports = Chart;
