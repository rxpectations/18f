'use strict';
var https = require('https');
var url = require('url');

var drugEventRequest = require('../../../models/openFDA/drugEventRequest');
var drugEventResponse = require('../../../models/openFDA/drugEventResponse');

module.exports = function (router) {

   /*
     * Drug Events Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;

        var model = new drugEventRequest(req.query, apiKey);
        var options = {
            protocol: 'https:',
            hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov',
            pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.event
        };

        var formattedUrl;
        var replyCount = 0;
        var body1, body2;
        var eventsTotal = -2;
        var topEvents = [];
        var abortted = false;

        options.search = model.totalsQuery();
        formattedUrl = url.format(options);
        console.log(formattedUrl);
        //req1
        console.time('openFDA [event totals search]');
        var fdaReq1 = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');
            searchRes.on('data', function(chunk) {
                body += chunk;
            });
            
            searchRes.on('end', function() {
                if (abortted) { return; }
                
                console.timeEnd('openFDA [event totals search]');
                body1 = body;
                replyCount++;

                if (searchRes.statusCode === 200) {
                    try {
                        var totalsObj = JSON.parse(body1);
                        eventsTotal = totalsObj.meta.results.total;
                    } catch (e) {
                        console.log('PARSE EXCEPTION [event totals search]: ' + e.name + '\r\n' + body1);
                        eventsTotal = -1;
                    }

                    if (replyCount === 2) {
                        combineEventReplies1(model.year, eventsTotal, topEvents, res);
                    }
                } else {
                    //non-OK response
                    if (replyCount !== 2) {
                        abortted = true;
                        fdaReq2.abort();
                    }

                    if (searchRes.statusCode === 404) {
                        //no results found, send 0 as the total (instead of error)
                        combineEventReplies1(model.year, 0, [], res);
                    } else if (searchRes.statusCode === 429) {
                        //rate-limited
                        console.log('RATE-LIMITED [event totals search]: ' + body1);
                        combineEventReplies1(model.year, -1, topEvents, res);
                    } else {
                        combineEventReplies1(model.year, -1, topEvents, res);
                        //res.send({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });
                    }
                }
            });
        }).on('error', function(e) {
            console.log('ERROR: '  + e.message);
        });


        options.search = model.eventsQuery();
        formattedUrl = url.format(options);
        console.log(formattedUrl);
        //req2
        console.time('openFDA [events search]');
        var fdaReq2 = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');
            searchRes.on('data', function(chunk) {
                body += chunk;
            });
            
            searchRes.on('end', function() {
                if (abortted) { return; }

                console.timeEnd('openFDA [events search]');
                body2 = body;
                replyCount++;

                if (searchRes.statusCode === 200) {
                    try {
                        var eventsObject = JSON.parse(body2);
                        topEvents = eventsObject.results;
                    } catch (e) {
                        console.log('PARSE EXCEPTION [events search]: ' + e.name + '\r\n' + body2);
                        topEvents = [];
                    }

                    if (replyCount === 2) {
                        combineEventReplies1(model.year, eventsTotal, topEvents, res);
                    }
                } else {
                    //non-OK response
                    if (replyCount !== 2) {
                        abortted = true;
                        fdaReq1.abort();
                    }

                    if (searchRes.statusCode === 404) {
                        //no events found
                        combineEventReplies1(model.year, 0, [], res);
                    } else if (searchRes.statusCode === 429) {
                        //rate-limited
                        console.log('RATE-LIMITED [event totals search]: ' + body2);
                        combineEventReplies1(model.year, eventsTotal, [], res);
                    } else {
                        combineEventReplies1(model.year, eventsTotal, [], res);
                        //res.send({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });
                    }
                }    
            });
        }).on('error', function(e) {
            console.log('ERROR: '  + e.message);
        });
    });

/*
    function combineEventReplies(year, totalsBody, resultsBody, res) {
        //console.log(totalsBody);
        //console.log(resultsBody);
    try {
        var bodyObject = (totalsBody !== undefined && totalsBody) ? JSON.parse(totalsBody) : null;
        var eventsObject = (resultsBody !== undefined && resultsBody) ? JSON.parse(resultsBody) : null;
    } catch (e) {
        res.send('Unexpected exception');
        return;
    }

        var total = (bodyObject === null || bodyObject.error !== undefined) ?
            -1 : bodyObject.meta.results.total;

        var drugEvents = (eventsObject === null || eventsObject.error !== undefined) ?
            [] : eventsObject.results;

        var responseObject = {year: year, total: total, events: drugEvents};
        res.send(responseObject);

    }
    */

    function combineEventReplies1(year, total, events, res) {
        var responseObject = {total: total, events: events};
        if (year !== undefined && year) {
            responseObject.year = year;
        }
        
        res.send(responseObject);
    }
};