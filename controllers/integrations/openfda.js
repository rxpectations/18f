'use strict';


var fdaSearchModel = require('../../models/fda/search');


module.exports = function (router) {

    
    router.get('/', function (req, res) {

    	var model = new fdaSearchModel(req.searchTerm, 'basic');
        
        
        res.json(model);
        
        
    });

};
