'use strict';
var https = require('https');
var url = require('url');
var getter = require('../../../lib/getData.js');

var drugLabelRequest = require('../../../models/openFDA/drugLabelRequest');
var drugInfoResponse = require('../../../models/openFDA/drugInfoResponse');

module.exports = function (router) {

    /*
     * Drug Label Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;

    	var model = new drugLabelRequest(req.query, apiKey, true);
    	var options = {
    		protocol: 'https:',
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov',
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.label,
    		search: model.query()
    	};

        var replyCount = 0;
        var repliesExpected = 2;
        var drugInfo, drugRecalls;

    	var formattedUrl = url.format(options);
        //console.log(formattedUrl);

        console.time('openFDA [info search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');
            searchRes.on('data', function(chunk) {
                body += chunk;
            });

            searchRes.on('end', function() {
                console.timeEnd('openFDA [info search]');
                console.log(body);
                

                if (searchRes.statusCode === 200) {
                    drugInfo = new drugInfoResponse(body);
                    //res.json(drugInfo);
                } else if (searchRes.statusCode === 404) {
                    drugInfo = {};
                } else {
                    drugInfo = {};
                    //res.json({'error': {'code': searchRes.statusCode, 'message': 'Unexpected Error'}});
                } //@TODO: handle other non-OK response
                
                replyCount++;
                if (replyCount === repliesExpected) {
                    handleAllReplies();
                }

			});
    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});

        var handleRecalls = function(err, data) {
            if (!err) {
                var recallsObj = JSON.parse(data);
                drugRecalls = (recallsObj.error || recallsObj.error !== undefined) ?
                    [] : recallsObj.results;
            } else {
                drugRecalls = [];
            }

            replyCount++;
            if (replyCount === repliesExpected) {
                handleAllReplies();
            }
        };

        //internal recall search
        var getRecalls = new getter(
            'http://localhost:' + (process.env.PORT || 8000)+'/integrations/openFDA/recalls?drug='+model.term+'&mode=name',
            { timer: false },
            handleRecalls);

        var handleAllReplies = function() {
            res.json({drugInfo: drugInfo, recalls: drugRecalls});
        };
    });

    
 
};
