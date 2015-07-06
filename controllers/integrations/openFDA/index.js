'use strict';
var https = require('https');
var url = require('url');

var DrugLabelRequest = require('../../../models/openFDA/drugLabelRequest');
var DrugLabelResponse = require('../../../models/openFDA/drugLabelResponse');

module.exports = function (router) {

    /*
     * Drug Label Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;
    	var model = new DrugLabelRequest(req.query, apiKey);

    	var options = {
    		protocol: 'https:',
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov',
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.label,
    		search: model.query()
    	};
    	var formattedUrl = url.format(options);
        //console.info(formattedUrl);

        console.time('openFDA:[label search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');
            searchRes.on('data', function(chunk) {
                body += chunk;
            });

            searchRes.on('end', function () { 
                handleSearchResponse(res, searchRes.statusCode, body); 
            });

    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });

    var handleSearchResponse = function(res, resCode, resBody) {
        console.timeEnd('openFDA:[label search]');
        
        var drugLabels;
        if (resCode === 200) {
            drugLabels = new DrugLabelResponse(resBody);
        } else if (resCode === 404 || resCode === 429) {
            drugLabels = new DrugLabelResponse(null);
        } else {
            console.error('openFDA:[label search] Unexpected Response, recieved (' + resCode + '): ' + resBody);
            drugLabels = resBody;
        }

        res.json(drugLabels);
    };
 
};
