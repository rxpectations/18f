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

    router.get('/fakeData', function(req, res) {
        var data = {
            "results": [
                {

                    "year": "2015",
                    "total": 0
                },
                {
                    "error": 
                    {
                        "code": 429,
                        "message": "Unexpected Error"
                    }
                },
                {

                    "year": "2013",
                    "total": 3095
                },
                {

                    "year": "2014",
                    "total": 2882
                },
                {

                    "year": "2011",
                    "total": 2559
                }
            ]
        };

        res.json(data);
    })

    router.get('/events/:drugname', function (req, res) {
        var drugname = req.params.drugname;
        var model = {
            drugname: drugname.replace(/-/g, ' '),
            script: 'events',
            totalIncidents: 3405,
            years: [
                2011, 2012, 2013, 2014, 2015
            ],
            about: 'short description of drug',
            sideEffects: 'short list of side effects',
            updates: 'updates about drug',
            resource: 'resource and community description',
            recalls: 5          
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
