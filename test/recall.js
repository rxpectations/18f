/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/integrations/openFDA/recall', function () {

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
            .get('/integrations/openFDA/recall?drug=Methadone-Hydrochloride&mode=name')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(function (err, res) {
                done(err);
            });
    });

    it('should return no results for Methadone-doesnotexist', function (done) {
        request(mock)
            .get('/integrations/openFDA/recall?drug=Methadone-doesnotexist&mode=name')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/NOT_FOUND/)
            .end(function (err, res) {
                done(err);
            });
    });

});
