/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';

var mockData = require('./support');


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should return search results', function (done) {
        request(mock)
            .get('/integrations/openFDA/?drug=hero&mode=name')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(/Super Hero/)
            .end(function (err, res) {
                done(err);
            });
    });

  /*it('should return no results', function (done) {
        request(mock)
            .get('/integrations/openFDA/?drug=5g5gh4random555thtth&mode=name')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(/No matches found/)
            .end(function (err, res) {
                done(err);
            });
    });*/

});
