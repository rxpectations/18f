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
            api.total = 0;
            for (var effect in api.results)  {
                api.total += api.results[effect].count;
            }
            res.json(api);
        };
        var getAPI = new getDataHTTPS(
            'https://api.fda.gov/drug/event.json?search=%28product_description:'+req.query.drug+'+patient.drug.openfda.brand_name:'+req.query.drug+'+patient.drug.openfda.generic_name:'+req.query.drug+'%29&count=patient.reaction.reactionmeddrapt.exact&limit=10',
            {timer : false},
            handleAPI
        );
    });

};
