'use strict';
var xml2js = require('xml2js');
var http = require('http');

module.exports = function (router) {

    /*
     * RSS Feed pull + JSONify
     */
    router.get('/', function (req, res) {
        var newDrugApprovalsUrl = req.app.kraken.get('integrations').feeds.newDrugApprovals;

        console.time('feeds [new drug approvals]');
    	var fdaReq = http.get(newDrugApprovalsUrl, function(feedRes) {
            var body = '';

            feedRes.setEncoding('utf8');
			feedRes.on('data', function(chunk) {
                body += chunk;
			});

			feedRes.on('end', function() {
				console.timeEnd('feeds [new drug approvals]');
				if (feedRes.statusCode === 200) {

                    res.send(body);
	            } else {
	                res.json({ 'error': { 'code': feedRes.statusCode, 'message': 'Unexpected Error' } });
				} 
			});
    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });
 
};