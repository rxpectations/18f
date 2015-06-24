'use strict';
var https = require('https');
var url = require('url');

var drugLabelRequest = require('../../../models/openFDA/drugLabelRequest');
var drugLabelResponse = require('../../../models/openFDA/drugLabelResponse');
var drugEventRequest = require('../../../models/openFDA/drugEventRequest');
var drugEventResponse = require('../../../models/openFDA/drugEventResponse');

module.exports = function (router) {

    /*
     * Drug Label Search
     */
    router.get('/', function (req, res) {
    	var model = new drugLabelRequest(req.query);
    	var options = { 
    		protocol: 'https:', 
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov', 
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.label, 
    		search: model.query()
    	};
    	var formattedUrl = url.format(options);
    	
        console.time('openFDA [label search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';
			if (searchRes.statusCode === 200) {	
		        searchRes.setEncoding('utf8');

				searchRes.on('data', function(chunk) {
                    body += chunk;
				});

                searchRes.on('end', function() {
                    var drugLabels = new drugLabelResponse(body);

                    res.send(drugLabels);
                    console.timeEnd('openFDA [label search]');
                });
			} else if (searchRes.statusCode === 404) {
                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    res.send(body);
                    console.timeEnd('openFDA [label search]');
                });
            } else {
                res.send({ "error": { "code": searchRes.statusCode, "message": "Unexpected Error" } });

			} //@TODO: handle other non-OK response

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });

    /*
     * Drug Events Search
     */
    router.get('/events', function (req, res) {
        var model = new drugEventRequest(req.query);
        var options = { 
            protocol: 'https:', 
            hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov', 
            pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.event, 
            search: model.query()
        };
        var formattedUrl = url.format(options);
        console.log(formattedUrl);
        
        console.time('openFDA [event search]');
        var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';
            if (searchRes.statusCode === 200) { 
                searchRes.setEncoding('utf8');

                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    //var drugEvents = new drugEventResponse(body);

                    //res.send(drugEvents);
                    res.send(body);
                    console.timeEnd('openFDA [event search]');
                });
            } else if (searchRes.statusCode === 404) {
                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    res.send(body);
                    console.timeEnd('openFDA [event search]');
                });
            } else {
                res.send({ "error": { "code": searchRes.statusCode, "message": "Unexpected Error" } });

            } //@TODO: handle other non-OK response

        }).on('error', function(e) {
            console.log('ERROR: '  + e.message);
        });
    });
};