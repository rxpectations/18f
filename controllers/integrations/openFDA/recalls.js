'use strict';
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
        //console.log(formattedUrl);
    	
        console.time('openFDA:[recall search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');

            searchRes.on('data', function(chunk) {
                body += chunk;
            });

            searchRes.on('end', function() {
                handleRecallsResponse(res, searchRes.statusCode, body);
            });

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });

    var handleRecallsResponse = function (res, resCode, resBody) {
        console.timeEnd('openFDA:[recall search]');

        var drugRecalls;
        if (resCode === 200) { 
            drugRecalls = new drugRecallResponse(resBody);
        } else if (resCode === 404 || resCode === 429) { 
            drugRecalls = new drugRecallResponse(null);
        } else {    
            drugRecalls = resBody; //openFDA error message
        }

        res.json(drugRecalls);
    };

};