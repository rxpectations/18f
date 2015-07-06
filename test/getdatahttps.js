'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var getDataHTTPS = require('../lib/getDataHTTPS');

describe("getDataHTTPS", function() {
  describe("constructor", function() {
    it("it should set the url", function() {
      var getData = new getDataHTTPS('https://wwww.google.com');
      expect(getData.url).to.equal(
          'https://wwww.google.com',
          {timer: false},
          function () {}
      );
    });

    it("it should set the options", function() {
      var getData = new getDataHTTPS(
          'https://wwww.google.com',
          {timer: false},
          function () {}
      );

      var testProperty = getData.options;
      testProperty.should.have.property('timer');
    });

    it("it should call the callback", function (done) {
      var testItem = 0;

      // Check initial value
      testItem.should.equal(0);

      var getData = new getDataHTTPS(
          'https://wwww.google.com',
          {timer: false},
          function () {
              testItem = 2;
              // Check value after callback
              testItem.should.equal(2);
              done();
              return testItem;
          }
      );
    });

    it("it should use second argument as callback if function", function (done) {
      var testItem = 0;

      // Check initial value
      testItem.should.equal(0);

      var getData = new getDataHTTPS(
          'https://wwww.google.com',
          function () {
              testItem = 2;
              // Check value after callback
              testItem.should.equal(2);
              done();
              return testItem;
          }
      );
    });
  });


});
