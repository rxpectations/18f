'use strict';
//App Packages
var getData = require('../../lib/getData');

var fdaSearchModel = require('../../models/fda/search');


module.exports = function (router) {

    
    router.get('/', function (req, res) {

    	var model = new fdaSearchModel(req.searchTerm, 'basic');
        
        
        res.json(model);
        
        
    });

    router.get('/getterClass', function (req, res) {

        var handleAPIQuery = function(err, data) {
            var jsonRes = JSON.parse(data);

            // Set the response as JSON and send in the model
            res.json(jsonRes);
        }

        var getAPIQuery = new getData(
            'http://api.fda.gov/drug/event.json?search=receivedate:[20040101+TO+20150101]&count=receivedate',
            { timer: false },
            handleAPIQuery);       
        
    });

};
