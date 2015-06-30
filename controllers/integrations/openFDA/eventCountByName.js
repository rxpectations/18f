'use strict';
var https = require('https');
var url = require('url');

var drugEventRequest = require('../../../models/openFDA/drugEventCountRequest');
//var drugEventResponse = require('../../../models/openFDA/drugEventResponse');

module.exports = function (router) {

   /*
     * Drug Events Search
     */
    router.get('/', function (req, res) {
        var apiKey = req.app.kraken.get('integrations').openFDA.apiKey;

        var model = new drugEventRequest(req.query, apiKey);
        var options = {
            protocol: 'https:',
            hostname: req.app.kraken.get('integrations').openFDA.hostname, //'api.fda.gov',
            pathname: req.app.kraken.get('integrations').openFDA.endpoints.drug.event
        };

        var formattedUrl;
        var body1;
        var yearTotal;
        var totalsByTime = [];
        var yearlyCounts = [];

        options.search = model.timeseriesQuery();
        formattedUrl = url.format(options);
        console.log(formattedUrl);

        console.time('openFDA [event count search]');
        var fdaReq1 = https.get(formattedUrl, function(searchRes) {
            var body = '';

            searchRes.setEncoding('utf8');
            searchRes.on('data', function(chunk) {
                body += chunk;
            });
            
            searchRes.on('end', function() {
                console.timeEnd('openFDA [event count search]');
                body1 = body;

                if (searchRes.statusCode === 200) {
                    try {
                        var timeseriesObj = JSON.parse(body1);
                        totalsByTime = timeseriesObj.results;
                    } catch (e) {
                        console.log('PARSE EXCEPTION [event count search]: ' + e.stack);
                        res.json({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error [parse]' } });
                        return;
                    }

                    yearlyCounts = combineTimeseriesYearly(totalsByTime);
                    res.json({drug: model.drug, drugEvent: model.drugEvent, yearlyCounts: yearlyCounts});
                } else {
                    //non-OK response
                    if (searchRes.statusCode === 404) {
                        //no results found, send 0 as the total (instead of error)
                        res.json({drug: model.drug, drugEvent: model.Event, yearlyCounts: []});
                    } else if (searchRes.statusCode === 429) {
                        //rate-limited
                        console.log('RATE-LIMITED [event count search]: ' + body1);
                        res.json({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error' } });
                    } else {
                        res.json({ 'error': { 'code': searchRes.statusCode, 'message': 'Unexpected Error [response]' } });
                    }
                }
            });
        }).on('error', function(e) {
            console.log('ERROR: '  + e.message);
        });

    });


//@TODO add function to return all years in data range to verify empty results returned when applicable?
    function combineTimeseriesYearly(timeseriesResults) {
        //associate object-array for temp counting
        var countsByYear = {};   //["2010": 200, "2011"]
        var year;
        var yearCount;
        for (var idx = 0, len = timeseriesResults.length; idx < len; idx++) {
            year = timeseriesResults[idx].time.substring(0, 4);
            yearCount = (countsByYear[year]) ? countsByYear[year] : 0;
            yearCount += timeseriesResults[idx].count;
            countsByYear[year] = yearCount;
            //countsByYear.push(year: year, count:yearCount});// = yearCount;
            //console.log();
        }

        //formal array of objects as response
        var countsByYearArr = [];   //[{year: 2010, count: 100}, {year: 2011, count: 200}]
        for (var yearKey in countsByYear) {
            if (countsByYear.hasOwnProperty(yearKey)) {
                countsByYearArr.push({year: yearKey, count: countsByYear[yearKey]});
            }
        }

        return countsByYearArr;
    }
};