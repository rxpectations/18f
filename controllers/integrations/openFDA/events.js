'use strict';
//Node Packages
var path = require('path');
//App Packages
var getDataHTTPS = require('../../../lib/getDataHTTPS');

//Models

module.exports = function (router) {

    router.get('/', function(req, res) {
        var handleAPI = function(err, data) {
            var api = JSON.parse(data);
            res.json(api);
        };
        var getAPI = new getDataHTTPS(
            'https://api.fda.gov/drug/event.json?search=(patient.drug.medicinalproduct:'+req.query.drug+'+patient.drug.openfda.brand_name:'+req.query.drug+'+patient.drug.openfda.generic_name:'+req.query.drug+')+AND+(receiptdate:[20100101+TO+20150706])&limit=50&count=patient.reaction.reactionmeddrapt.exact&api_key=fWo3VYTbToPaLcFem1T9ZJqqNHNmetmU3peGa1BF',
            {timer : false},
            handleAPI
        );
    });

};
