'use strict';
var http = require('http');
var url = require('url');

var drugEventRequest = require('../../../models/openFDA/drugEventRequest');
var drugEventResponse = require('../../../models/openFDA/drugEventResponse');

module.exports = function (router) {
    
    /*
     * Drug Events Search by year range
     *  @PARAM  year  start year to present
     */
    router.get('/', function (req, res) {
        var model = new drugEventRequest(req.query);
        var options = {
            protocol: 'http:',
            host: 'localhost:' + (process.env.PORT || 8000), //@TODO: (VERIFY) replace with config settings
            pathname: '/integrations/openFDA/eventsByYear/',
            //search: '?mode=' + model.mode + '&term=' + model.drug + '&year=' +
        };


        var replyCount = 0;
        var repliesExpected = (new Date()).getFullYear() - model.year + 1;
        var resultsBody = [];

        var yearData = function(searchRes) {

            var body = '';
            if (searchRes.statusCode === 200) {
                searchRes.setEncoding('utf8');

                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    replyCount++;
                    if (body !== '') {
                        resultsBody.push(JSON.parse(body));
                    }

                    if (replyCount === repliesExpected) {
                        console.timeEnd('openFDA [event multi-year search]');
                        res.json({ results: resultsBody});
                    }
                });
            } else if (searchRes.statusCode === 404) {
                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    resultsBody.push(body);

                    replyCount++;
                    if (replyCount === repliesExpected) {
                        console.timeEnd('openFDA [event multi-year search]');
                        res.json({results: resultsBody});
                    }
                });
            } else {
                console.timeEnd('openFDA [event multi-year search]');
                //@TODO: handle 429 and other errors in this multi-async request
                res.json({'error': {'code': searchRes.statusCode, 'message': 'Unexpected Error'}});

            } //@TODO: handle other non-OK response

        };

        var yearError =  function(e) {
            console.timeEnd('openFDA [event multi-year search]');
            console.log('ERROR: '  + e.message);
        };

        console.time('openFDA [event multi-year search]');
        for (var idx = 0; idx < repliesExpected; idx++) {
            var year = parseInt(model.year) + idx;
            options.search = '?mode=' + model.mode + '&drug=' + model.drug + '&year=' + year;
            var formattedUrl = url.format(options);
            //console.log(formattedUrl);

            var fdaReq = http.get(formattedUrl, yearData)
            .on('error', yearError);
        }



    });
};