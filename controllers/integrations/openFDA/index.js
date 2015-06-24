'use strict';
var https = require('https');
var url = require('url');

var drugLabelRequest = require('../../../models/openFDA/drugLabelRequest');
var drugLabelResponse = require('../../../models/openFDA/drugLabelResponse');

module.exports = function (router) {

    router.get('/', function (req, res) {
    	var model = new drugLabelRequest(req.query);
    	var options = { 
    		protocol: 'https:', 
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov', 
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.label, 
    		search: model.query(),
    		//query: model.query() //doesn't format with querystring
    	};
    	var formattedUrl = url.format(options);
    	
        console.time('openFDA [label search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
<<<<<<< HEAD
			if (searchRes.statusCode === 200) {	
=======
            var body = '';
			if (searchRes.statusCode == 200) {	
>>>>>>> origin/dev
		        searchRes.setEncoding('utf8');
                //var body = '';

				searchRes.on('data', function(chunk) {
                    body += chunk;
                    //res.send(chunk);
				});

                searchRes.on('end', function() {
                    var drugLabels = new drugLabelResponse(body);

                    res.send(drugLabels);
                    console.timeEnd('openFDA [label search]');
                });
			} else {
<<<<<<< HEAD
                if (searchRes.statusCode === 404) {
                    searchRes.on('data', function(chunk) {
                        res.send('"error": { "code": "NOT_FOUND", "message": "No matches found!"}');
=======
                if (searchRes.statusCode == 404) {
                    searchRes.on("data", function(chunk) {
                        body += chunk;
                        //res.send('"error": { "code": "NOT_FOUND", "message": "No matches found!"}');
                        //console.timeEnd('openFDA [label search]');
                    });

                    searchRes.on("end", function() {
                        res.send(body);
>>>>>>> origin/dev
                        console.timeEnd('openFDA [label search]');
                    });
                }
				//@TODO: handle other non-OK response
			}

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });


};
