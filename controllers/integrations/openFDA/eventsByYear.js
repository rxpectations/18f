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
            pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.event,
            search: model.totalsQuery()
        };
        var formattedUrl = url.format(options);
console.log(formattedUrl);

        var replyCount = 0;
        var body1, body2;

        //req1
        console.time('openFDA [event totals search]');
        var fdaReq1 = https.get(formattedUrl, function(searchRes) {
            var body = '';
            if (searchRes.statusCode === 200) {
                searchRes.setEncoding('utf8');

                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    //var drugEvents = new drugEventResponse(body);

                    //res.json(drugEvents);
                    //res.json(body);
                    console.timeEnd('openFDA [event totals search]');
                    body1 = body;
                    replyCount++;
                    if (replyCount === 2) {
                        combineEventReplies(model.year, body1, body2, res);
                    }
                });
            } else if (searchRes.statusCode === 404) {
                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    console.timeEnd('openFDA [event totals search]');
                    body1 = body;
                    replyCount++;
                    if (replyCount === 2) {

                    } else {
                        fdaReq2.abort();
                    }
                    combineEventReplies(model.year, body1, body2, res);
                });
            } else {
console.log(searchRes);
//@TODO: handle 429 and other errors in this multi-async request
                if (replyCount === 2) {

                } else {
                    fdaReq2.abort();
                }
                res.send({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });

            } //@TODO: handle other non-OK response

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
            if (searchRes.statusCode === 200) {
                searchRes.setEncoding('utf8');

                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    //var drugEvents = new drugEventResponse(body);

                    //res.json(drugEvents);
                    //res.json(body);
                    console.timeEnd('openFDA [events search]');
                    body2 = body;
                    replyCount++;
                    if (replyCount === 2) {
                        combineEventReplies(model.year, body1, body2, res);
                    }
                });
            } else if (searchRes.statusCode === 404) {
                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    console.timeEnd('openFDA [events search]');
                    body2 = body;
                    replyCount++;
                    if (replyCount === 2) {

                    } else {
                        fdaReq1.abort();
                    }
                    combineEventReplies(model.year, body1, body2, res);
                });
            } else {
console.log(searchRes);
//@TODO: handle 429 and other errors in this multi-async request
                if (replyCount === 2) {

                } else {
                    fdaReq1.abort();
                }
                res.send({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });

            } //@TODO: handle other non-OK response

        }).on('error', function(e) {
            console.log('ERROR: '  + e.message);
        });
    });

    function combineEventReplies(year, body1, body2, res) {
        //console.log(body1);
        //console.log(body2);
        var bodyObject = (body1 !== undefined) ? JSON.parse(body1) : null;
        var eventsObject = (body2 !== undefined) ? JSON.parse(body2) : null;

        var total = (bodyObject === null || bodyObject.error !== undefined) ?
            0 : bodyObject.meta.results.total;

        var drugEvents = (eventsObject === null || eventsObject.error !== undefined) ?
            [] : eventsObject.results;

        var responseObject = { year: year, total: total, events: drugEvents };
        res.send(responseObject);

    }
};