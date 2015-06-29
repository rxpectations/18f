'use strict';
var xml2js = require('xml2js');
var http = require('http');
var url = require('url');

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
					    	//xml2js places attribute fields into arrays of 1, 
					    	result.rss.channel[0].item.forEach(function (currVal, idx, currArr) {
				    			for (var key in result.rss.channel[0].item[idx]) {
								   if (result.rss.channel[0].item[idx].hasOwnProperty(key)) {
								      var element = result.rss.channel[0].item[idx][key];
								      result.rss.channel[0].item[idx][key] = element[0];
								   }
								}
					    	});
					    	
					    	res.json({articles: result.rss.channel[0].item});
						}
					});
	            } else if (feedRes.statusCode >= 300 && feedRes.statusCode < 400) {
	            	res.send(url.parse(feedRes.headers.location));
	            } else {
	                res.json({'error': {'code': feedRes.statusCode, 'message': 'Unexpected Error'}});
				} 
			});
    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });
 
};