'use strict';
var xml2js = require('xml2js');
var http = require('http');
var url = require('url');

module.exports = function (router) {
	var DEFAULT_FEED_NAME = 'new-drugs';

    /*
     * RSS Feed pull + JSONify
     */
    router.get('/', function (req, res) {
    	var feedUrl = req.app.kraken.get('integrations').feeds[DEFAULT_FEED_NAME];
    	if (req.query.name !== undefined && req.query.name) {
    		if (req.app.kraken.get('integrations').feeds.hasOwnProperty(req.query.name)) {
    			feedUrl = req.app.kraken.get('integrations').feeds[req.query.name];
    		} else {
    			//feed name supplied, but not found in config
    			res.json({total: 0, articles: []});
    			return;
    		}
    	}

        console.time('feeds [' + feedUrl + ']');
    	var fdaReq = http.get(feedUrl, function(feedRes) {
            var body = '';

            feedRes.setEncoding('utf8');
			feedRes.on('data', function(chunk) {
                body += chunk;
			});

			feedRes.on('end', function() {
				console.timeEnd('feeds [' + feedUrl + ']');
				if (feedRes.statusCode === 200) {
					var parseString = require('xml2js').parseString;
					parseString(body, function (err, result) {
					    if (err) {
					    	res.json({'error': {'code': 'xml-parse', 'message': 'Unexpected Error'}});
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
					    	
					    	res.json({total: result.rss.channel[0].item.length, articles: result.rss.channel[0].item});
						}
					});
	            } else if (feedRes.statusCode >= 300 && feedRes.statusCode < 400) {
	            	res.json({'error': {'code': feedRes.statusCode, 'message': url.parse(feedRes.headers.location)}});
	            } else {
	                res.json({'error': {'code': feedRes.statusCode, 'message': 'Unexpected Error'}});
				} 
			});
    	}).on('error', function(e) {
    		console.log('ERROR: '  + e.message);
    	});
    });
 
};