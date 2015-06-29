/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/events/:drugname', function () {

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


    it('should return results page for Methadone-Hydrochloride', function (done) {
        request(mock)
            .get('/events/Methadone-Hydrochloride')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Methadone Hydrochloride/)
            .end(function (err, res) {
                done(err);
            });
    });

    it('should return results page for Ethanol', function (done) {
        request(mock)
            .get('/events/ETHANOL')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/ETHANOL/)
            .end(function (err, res) {
                done(err);
            });
    });

    /*
    // Commented out while we use fake data
    it('should return 404 for unknown name', function (done) {
        request(mock)
            .get('/events/thisnameofdrugdoesnotexist333444!')
            .expect(404)
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                done(err);
            });
    });*/


});
