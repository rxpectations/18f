'use strict';
var http = require('http');
var https = require('https');
var url = require('url');

var drugRecallRequest = require('../../../models/openFDA/drugRecallRequest');
var drugRecallResponse = require('../../../models/openFDA/drugRecallResponse');

module.exports = function (router) {

    /*
     * Drug Label Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;

    	var model = new drugRecallRequest(req.query, apiKey);
    	var options = { 
    		protocol: 'https:', 
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov', 
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.enforcement, 
    		search: model.query()
    	};
    	var formattedUrl = url.format(options);
console.log(formattedUrl);
    	
        console.time('openFDA [recall search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';
			if (searchRes.statusCode === 200) {	
		        searchRes.setEncoding('utf8');

				searchRes.on('data', function(chunk) {
                    body += chunk;
				});

                searchRes.on('end', function() {
                    var drugRecalls = new drugRecallResponse(body);

                    res.send(drugRecalls);
                    console.timeEnd('openFDA [recall search]');
                });
			} else if (searchRes.statusCode === 404) {
                searchRes.on('data', function(chunk) {
                    body += chunk;
                });

                searchRes.on('end', function() {
                    res.send(body);
                    console.timeEnd('openFDA [recall search]');
                });
            } else {
                res.send({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });

			} //@TODO: handle other non-OK response

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });




};