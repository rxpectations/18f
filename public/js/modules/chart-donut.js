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
  this.svgChart = this.svg.append('g')
    .attr('class', 'pie-chart')
    .attr('transform', 
      'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');
  this.centerLabel = this.svg.append('svg:g')
    .attr('class', 'center-label')
    .attr('transform', 
      'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');


}
/**
 * Bind to relevant DOM events
 */
Donut.prototype.bind = function() {
  var self = this;
  $('body').bind('eventData', this.create.bind(this));
  $('body').bind('eventSelect.rx', this.rotate.bind(this));
  $(window).resize(function windowResize() {
    self.update(self.getData());
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
  this.arcs = this.svgChart.selectAll('.arc')
    .data(this._d3Configs.donut(data.events))
    .enter().append('g')
      .attr('class', 'arc');

  this.arcs.append('path')
    .attr('d', this._d3Configs.arc)
    .attr('class', function(d) { return self._d3Configs.color(d.data.term); })
    .attr('data-term', function(d) { return d.data.term; })
    .on('mouseover', this.arcOver.bind(this))
    .on('mouseout', this.arcOut.bind(this));
  
  if (!this.label) {
    this.label = this.centerLabel.append('svg:text')
      .attr('class', 'donut-label')
      .attr('dy', 20)
      .attr('text-anchor', 'middle') // text-align: right
      .text('total reactions');
    this.totalLabel = this.centerLabel.append('svg:text')
      .attr('class', 'donut-total')
      .attr('dy', 0)
      .attr('text-anchor', 'middle') // text-align: right
      .text(numeral(data.total).format('0,0'));
  }

  $('body').trigger('donutLoaded.rx', this.getData());
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
Donut.prototype.rotate = function(event, data) {
  
  var self = this;
  var arc = d3.select('[data-term="'+data.term+'"]');
  var center = this._d3Configs.arc.centroid(arc.data()[0]);

  if (!this.currAngle) {
    this.currAngle = 0;
  }
  
  var vertex = {"x": center[0]-0,"y":-(center[1])};
  var newAngle = Math.acos( vertex.x / Math.sqrt(vertex.x*vertex.x + vertex.y*vertex.y) );
  newAngle = (newAngle * 180 / Math.PI);//in degrees
  if (0 < center[1]) {
    newAngle = 90 - newAngle;
  } else {
    newAngle = 90 + newAngle;
  }
  d3.select('.pie-chart').transition().duration(750)
    .attrTween('transform', function() { 
      return d3.interpolateString(
        'translate(' + (self.width / 2) + ',' + (self.height / 2) + ')rotate('+self.currAngle+')', 
        'translate(' + (self.width / 2) + ',' + (self.height / 2) + ')rotate('+newAngle+')'); 
    })
    .each('end', function() {
      self.currAngle = newAngle;
    });
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
