'use strict';

var DrugLabelModel = function (searchResponse) {
    var responseObject = JSON.parse(searchResponse);
    var hitCount = (responseObject.meta.results.limit < responseObject.meta.results.total) ? 
        responseObject.meta.results.limit : responseObject.meta.results.total;   //@TODO: handle 100+
    var brandNames = []; 
    var genericNames = [];

    for (var idx = 0; idx < hitCount; idx++) {
        if (responseObject.results[idx].openfda !== undefined) {
            // has openFDA data
            if (responseObject.results[idx].openfda.brand_name !== undefined &&
                brandNames.indexOf(toCleanString(responseObject.results[idx].openfda.brand_name)) === -1) {
                brandNames.push(toCleanString(responseObject.results[idx].openfda.brand_name));
            }
            if (responseObject.results[idx].openfda.generic_name !== undefined &&
                genericNames.indexOf(toCleanString(responseObject.results[idx].openfda.generic_name)) === -1) {
                genericNames.push(toCleanString(responseObject.results[idx].openfda.generic_name));
            }
        } 
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(str){return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();});
    }

    function toCleanString(obj) {
        return toTitleCase(obj.toString().trim());
    }

    return {
        rawTotal: hitCount,
        results: {
            brandNames: brandNames,
            genericNames: genericNames
        }
    };
};

module.exports = DrugLabelModel;
