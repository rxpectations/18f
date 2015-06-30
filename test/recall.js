/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';

var nock = require('nock');

var mockData = nock('https://api.fda.gov')
  .get('/drug/enforcement.json?search=(product_description:Methadone-Hydrochloride+patient.drug.openfda.brand_name:Methadone-Hydrochloride+patient.drug.openfda.generic_name:Methadone-Hydrochloride)&limit=10&api_key=fWo3VYTbToPaLcFem1T9ZJqqNHNmetmU3peGa1BF')
  .replyWithFile(200, __dirname + '/mocks/recall.json', {
    'Content-Type': 'application/json'
  })
  .get('/drug/enforcement.json?search=(product_description:Methadone-doesnotexist+patient.drug.openfda.brand_name:Methadone-doesnotexist+patient.drug.openfda.generic_name:Methadone-doesnotexist)&limit=10&api_key=fWo3VYTbToPaLcFem1T9ZJqqNHNmetmU3peGa1BF')
  .reply(404, {code: "NOT_FOUND"}, {
    'Content-Type': 'application/json'
  });


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/integrations/openFDA/', function () {

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


    it('should return recall results for Methadone-Hydrochloride', function (done) {
        request(mock)
            .get('/integrations/openFDA/recalls?drug=Methadone-Hydrochloride&mode=name')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(function (err, res) {
                done(err);
            });
    });

    it('should return no results for Methadone-doesnotexist', function (done) {
        request(mock)
            .get('/integrations/openFDA/recalls?drug=Methadone-doesnotexist&mode=name')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect('{"total":0,"results":[]}')
            .end(function (err, res) {
                done(err);
            });
    });

});
