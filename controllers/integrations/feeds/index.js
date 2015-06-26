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
					var parseString = require('xml2js').parseString;
					parseString(body, function (err, result) {
					    if (err) {
					    	res.json({'error': {'code': feedRes.statusCode, 'message': 'Unexpected Error'}});
					    } else {
					    	res.json({articles: result.rss.channel[0].item});
						}
					});
	            } else {
	                res.json({'error': {'code': feedRes.statusCode, 'message': 'Unexpected Error'}});
				} 
			});
    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });
 
};