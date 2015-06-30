/**
 * Donut
 * ====
 * This module will render the Donut component and show if not
 * already visisible.
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');
var d3 = require('d3');
var numeral = require('numeral');

/**
 * Create new instance of Donut
 * @param element
 * @constructor
 * @param rawData
 */
var Donut = function Donut(element) {

  this.$el = $(element);
  this.legend = (this.$el.data('legend'))?this.$el.data('legend'):false;
  this.init();
  this.bind();
};

/**
 *  Initialize the Donut with basic attributes
 * 
 */
Donut.prototype.init = function() {
  this.width = this.$el.width();
  this.height = this.$el.height();

  this._d3Configs = {};
  this._d3Configs.radius = Math.min(this.width, this.height) / 2;
  this._d3Configs.color = d3.scale.ordinal().range(d3.range(10).map(function(i) { return "c" + i; }));
  //this._d3Configs.color = d3.scale.category10();

  this._d3Configs.donut = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count });

  this._d3Configs.arc = d3.svg.arc()
    .innerRadius(this._d3Configs.radius * 0.7)
    .outerRadius(this._d3Configs.radius);

  this._d3Configs.pieTotal = 0;
  

  this.svg = d3.select(this.$el[0])
    .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    .append('g')
      .attr('class', 'pie-chart')
      .attr('transform', 
            'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');


}
/**
 * Bind to relevant DOM events
 */
Donut.prototype.bind = function() {

  $('body').bind('eventData', this.create.bind(this));
  $(window).resize(function windowResize() {
    this.update(this.getData());
  });
};

/**
 * Called to initialize data
 * @param  {Object} event Can be `data` if called directly
 * @param  {Object} data  New updated data
 */
Donut.prototype.create = function(event, data) {

  var self = this;
  
  if (!data) {
    data = event;
  }
  this.setData(data);

  this.update(this.getData());

};

/**
 * Called to update Donut with new data
 * @param  {Object} data  New updated data
 */
Donut.prototype.update = function(data) {
  var self = this;
  var arcs = this.svg.selectAll('.arc')
    .data(this._d3Configs.donut(data.results))
    .enter().append('g')
      .attr('class', 'arc');

  arcs.append('path')
    .attr('d', this._d3Configs.arc)
    .attr('class', function(d) { return self._d3Configs.color(d.data.term); })
    .on('mouseover', this.arcOver.bind(this))
    .on('mouseout', this.arcOut.bind(this));

  var center_group = this.svg.append('svg:g')
      .attr('class', 'center_group');

  var label = center_group.append('svg:text')
      .attr('class', 'donut-label')
      .attr('dy', 20)
      .attr('text-anchor', 'middle') // text-align: right
      .text('reported reactions');
  var totalLabel = center_group.append('svg:text')
      .attr('class', 'donut-total')
      .attr('dy', 0)
      .attr('text-anchor', 'middle') // text-align: right
      .text(numeral(data.total).format('0,0'));
};

Donut.prototype.arcOver = function(d) {
  console.log(d.data.term);
  this.$el.siblings('.arc-selected').html(d.data.term);
}

Donut.prototype.arcOut = function(d) {
  this.$el.siblings('.arc-selected').html('&nbsp');
}
/**
 * Called to format events for Donut data
 * @param {Object}   data
 */
Donut.prototype.formatData = function(data) {
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



  return events.slice(0, 5);
}



/**
 * Getter method for Donut data
 */
Donut.prototype.getData = function() {
  return this.data;
}

/**
 * Setter method for Donut data
 * @param {Object}   data
 */
Donut.prototype.setData = function(data) {
  if (!this.data) {
    this.data = data;
  }
}

module.exports = Donut;
