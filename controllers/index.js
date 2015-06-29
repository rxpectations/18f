'use strict';
//Node Packages
var path = require('path');
//App Packages
var getData = require('../lib/getData');

//Models
var IndexModel = require('../models/index');
var drugEventResponse = require('../models/static/drugEventResponse')();


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/styleguide', function (req, res) {
        
        // Use path.normalize for consistent paths 
        // across Windows and OS
        res.render(path.normalize('styleguide'), model.Styleguide());        
        
    });

    router.get('/static/events', function(req, res) {
        

        res.json(drugEventResponse);
    });

    router.get('/events/:drugname', function (req, res) {
        var drugname = req.params.drugname;
        var model = {
            drugname: drugname.replace(/-/g, ' '),
            script: 'events',
            years: [
                2011, 2012, 2013, 2014, 2015
            ],
            about: 'short description of drug',
            sideEffects: 'short list of side effects',
            updates: 'updates about drug',
            resource: 'resource and community description'
        };
        var handleRecalls = function(err, data) {
            var recalls = JSON.parse(data);
            model.recalls = recalls.total;
            
            // Use path.normalize for consistent paths 
            // across Windows and OS
            res.render(path.normalize('drug-detail'), model);
        }

        var getRecalls = new getData(
            'http://localhost:' + (process.env.PORT || 8000)+'/integrations/openFDA/recall?drug='+model.drugname+'&mode=name',
            { timer: false },
            handleRecalls);
        
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
