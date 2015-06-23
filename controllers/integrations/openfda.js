'use strict';
var https = require('https');
var url = require('url');

var fdaSearchModel = require('../../models/fda/search');

module.exports = function (router) {

    router.get('/', function (req, res) {
    	var model = new fdaSearchModel(req.query);
    	var options = { 
    		protocol: 'https:', 
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov', 
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.label, 
    		search: model.query(),
    		//query: model.query() //doesn't format with querystring
    	};
    	var formattedUrl = url.format(options);
console.log('formattedUrl:' + formattedUrl);
console.log('searchquerystring:' + options.query);
    	
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
			if (searchRes.statusCode == 200) {	
		        searchRes.setEncoding('utf8');

				searchRes.on("data", function(chunk) {
					if (chunk.error) {
						res.send('{error: "no results found"');
					} else {
						res.send(chunk);
					}
				});
			} else {
				//@TODO: handle not OK response
			}

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });

};
