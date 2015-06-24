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
    router.get('/', function (req, res) {
        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize('index'), model.Index());
        
        
    });

    // Dyanmic routing example
    router.get('/:pagename', function (req, res) {
        // Access the route parameter
        console.log(req.params.pagename);

        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize('styleguide'), model.Styleguide());        
        
    });

};
