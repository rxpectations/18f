'use strict';
var https = require('https');
var url = require('url');

var drugLabelRequest = require('../../../models/openFDA/drugLabelRequest');
var drugLabelResponse = require('../../../models/openFDA/drugLabelResponse');

module.exports = function (router) {

    /*
     * Drug Label Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;

    	var model = new drugLabelRequest(req.query, apiKey);
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

                    res.json(drugLabels);
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
                res.json({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });

			} //@TODO: handle other non-OK response

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });
 
};
