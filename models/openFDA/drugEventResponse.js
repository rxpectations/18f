'use strict';

//@TODO: IMPLEMENT
var DrugLabelModel = function (searchResponse) {
    var responseObject = JSON.parse(searchResponse);

    var drugEvents = [];

    (function toArrays() {
        //there will always be a results, otherwise API would have returned 404
        for (var idx = 0, len = responseObject.results.length; idx < len; idx++) {
            
        }
    })();

    return {

    };
};

module.exports = DrugLabelModel;
