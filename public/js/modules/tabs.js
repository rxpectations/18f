/**
 * Tabs
 * ====
 * This module will render the Tabs component
 */

/* Module dependencies */

var $ = window.jQuery = require('jquery');

/**
 * Create new instance of Tabs
 * @param element
 * @constructor
 */
var Tabs = function Tabify(element) {
  this.$elem = $(element);
  this.$tabContent = this.$elem.find('.tab-content-wrapper').find('.tab-content');
  this.$tabHeader = this.$elem.find('.tab-content-wrapper').find('.tab-content').find('h4');
  tabList = this.$elem.find('.tab-list');  
  
  this.createTabs();
  this.bind();  
};

Tabs.prototype.createTabs = function() {

  this.$tabHeader.each(function SetTabHeaders (){
    tabList.append("<li>" + $(this).text() + "</li>");
  });

  this.tabSetUp();

};

Tabs.prototype.tabSetUp = function() {
  this.$tabItem = this.$elem.find('.tab-list').find('li');

  this.$tabContent.first().addClass('active');
  this.$tabItem.first().addClass('active');
};

/**
 * Bind to relevant DOM events
 */
Tabs.prototype.bind = function() {
  this.$elem.find('.tab-list').find('li').on('click.Tabs', function() {
    var activeTab = $(this),
    activeContent = activeTab.index();

    activeTab.parent().children('li').removeClass('active');
    activeTab.addClass('active');
    activeTab.parent().parent().find('.tab-content').removeClass('active');
    activeTab.parent().parent().find('.tab-content').eq(activeContent).addClass('active');

  });

  this.$elem.on('click.Tabs', function(e) {
    e.preventDefault();
  });
};

module.exports = Tabs;
