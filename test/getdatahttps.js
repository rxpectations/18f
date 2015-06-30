'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var getDataHTTPS = require('../lib/getDataHTTPS');

describe("getDataHTTPS", function() {
  describe("constructor", function() {
    it("it should set the url", function() {
      var getData = new getDataHTTPS('https://wwww.google.com');
      expect(getData.url).to.equal('https://wwww.google.com');
    });

    it("it should set the options", function() {
      var getData = new getDataHTTPS(
          'https://wwww.google.com',
          {timer: false}
      );

      var testProperty = getData.options;
      testProperty.should.have.property('timer');
    });

    it("it should call the callback", function (done) {
      var testItem = 0;

      var callBack = function () {
          testItem = 2;
          // Check value after callback
          testItem.should.equal(2);
          done();
          return testItem;
      };

      // Check initial value
      testItem.should.equal(0);

      var getData = new getDataHTTPS(
          'https://wwww.google.com',
          {},
          callBack
      );
    });
  });

  // describe should not accept https

  // describe("#greets", function() {
  //   it("should throw if no target is passed in", function() {
  //     expect(function() {
  //       (new Cow()).greets();
  //     }).to.throw(Error);
  //   });
  //
  //   it("should greet passed target", function() {
  //     var greetings = (new Cow("Kate")).greets("Baby");
  //     expect(greetings).to.equal("Kate greets Baby");
  //   });
  // });
});
