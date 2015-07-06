'use strict';
//Node Packages
var path = require('path');
//App Packages
var getData = require('../lib/getData');
var getDataHTTPS = require('../lib/getDataHTTPS');

//Models
var IndexModel = require('../models/index');
var drugEventResponse = require('../models/static/drugEventResponse');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/styleguide', function (req, res) {

        // Use path.normalize for consistent paths
        // across Windows and OS
        res.render(path.normalize('styleguide'), model.Styleguide());

    });

    router.get('/disclaimer', function (req, res) {

        // Use path.normalize for consistent paths
        // across Windows and OS
        res.render(path.normalize('disclaimer'), model.Styleguide());

    });

    router.get('/static/events', function(req, res) {
        res.json(drugEventResponse());

    });

    router.get('/events/:drugname', function (req, res) {
        var drugname = req.params.drugname;
        var model = {
            drugname: drugname.replace(/-/g, ' '),
            hashtag: drugname.replace(/\s/g, ''),
            script: 'events'
        };

        var handleRecalls = function(err, data) {
            var info = JSON.parse(data);
            console.log(info);
            if (info.drugInfo.drugInfo === undefined) {
                var errorModel = { url: req.url, statusCode: 404 };
                if (req.xhr) {
                    res.send(404, errorModel);
                } else {
                    res.status(404);
                    res.render(path.normalize('errors/404'), errorModel);
                }
            } else {
                
                model.recalls = (info.recalls === undefined)?null:info.recalls;
                model.recallsTotal = (info.recalls === undefined)?0:info.recalls.length;
                model.drugInfo = info.drugInfo.drugInfo;
                // Use path.normalize for consistent paths
                // across Windows and OS
                console.log(model);
                res.render(path.normalize('drug-detail'), model);
            }
        };

        var getRecalls = new getData(
            'http://localhost:' + (process.env.PORT || 8000)+'/integrations/openFDA/info?drug='+model.drugname+'&mode=name',
            { timer: false },
            handleRecalls);

    });

    router.get('/search', function (req, res){

        var handleSearchResults = function(err, data) {
            var model = JSON.parse(data);
            model.title = 'Search Condition: ' + req.query.term;
            model.term = req.query.term;
            model.resultsTotal = model.results.brandNames.length + model.results.genericNames.length;
            for (var r in model.results) {
              model[r] = model.results[r].map(function(item) {
                var obj = {};
                obj.value = item;
                obj.url = item.replace(/\s/g, '-');
                return obj;
              });
            }
            console.log(model);
            res.render('search', model);
        };

        var getSearchResults = new getData(
            'http://localhost:' + (process.env.PORT || 8000)+ '/integrations/openFDA/?drug='+req.query.term+'&mode=all',
            {timer: false},
            handleSearchResults);
    });
    router.get('/', function (req, res) {
        // Use path.normalize for consistent paths
        // across Windows and OS
        res.render(path.normalize('index'), model.Index());

    });

    // Dyanmic routing example
    router.get('/error/:error', function (req, res) {
        // Use path.normalize for consistent paths
        // across Windows and OS
        res.render(path.normalize('errors/'+req.params.error), {});

    });

    // Dyanmic routing example
    router.get('/:templatename', function (req, res) {
        // Use path.normalize for consistent paths
        // across Windows and OS
        res.render(path.normalize(req.params.templatename), model.Styleguide());

    });

};
