'use strict';
//Node Packages
var path = require('path');
var fs = require('fs');

var dust = require('dustjs-linkedin');


module.exports = function (router) {

    router.get('/getTemplate', function (req, res) {
        fs.readFile('public/templates/'+ req.query.path +'.dust', { encoding: 'utf8' }, function(err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(data);
            res.setHeader('content-type', 'text/plain');
            res.end(data);
        });
        
    });

};
