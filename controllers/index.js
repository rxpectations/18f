'use strict';
//Node Packages
var path = require('path');
//App Packages
var getData = require('../lib/getData');

//Models
var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/styleguide', function (req, res) {
        
        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize('styleguide'), model.Styleguide());        
        
    });

    router.get('/drugs/:drugname', function (req, res) {
        var drugname = req.params.drugname;
        var model = {
            drugname: drugname
        };
        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize('drug-detail'), model);       
        
    });

    router.get('/', function (req, res) {
        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize('index'), model.Index());
        
        
    });

    // Dyanmic routing example
    router.get('/:templatename', function (req, res) {
        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize(req.params.templatename), model.Styleguide());        
        
    });

};
