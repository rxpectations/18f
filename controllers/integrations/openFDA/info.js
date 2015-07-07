'use strict';
var https = require('https');
var url = require('url');
var getter = require('../../../lib/getData.js');

var drugLabelRequest = require('../../../models/openFDA/drugLabelRequest');
var drugInfoResponse = require('../../../models/openFDA/drugInfoResponse');

module.exports = function (router) {

    /*
     * Drug Info Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;
    	var model = new drugLabelRequest(req.query, apiKey, true);
    	
        var options = {
    		protocol: 'https:',
    		hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov',
    		pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.label,
    		search: model.exactQuery()
    	};
        var formattedUrl = url.format(options);
        //console.info(formattedUrl);

        var replyCount = 0;
        var repliesExpected = 2;
        var drugInfo, drugRecalls;

        var handleInfoSearchResponse = function (resCode, resBody) {
            console.timeEnd('openFDA:[info search]');

            if (resCode === 200) {
                drugInfo = new drugInfoResponse(resBody);
            } else if (resCode === 404 || resCode === 429) {
                drugInfo = new drugInfoResponse(null);
            } else {
                console.error('openFDA:[info search] Unexpected Response, recieved (' + resCode + '): ' + resBody);
                drugInfo = resBody;
            }
            
            replyCount++;
            if (replyCount === repliesExpected) {
                handleAllReplies();
            }
        };

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

        //external label search for info
        console.time('openFDA:[info search]');
    	var fdaReq = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');
            searchRes.on('data', function(chunk) {
                body += chunk;
            });

            searchRes.on('end', function() {
                handleInfoSearchResponse(searchRes.statusCode, body);
			});
    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});

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
