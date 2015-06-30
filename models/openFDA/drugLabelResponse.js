'use strict';

var DrugLabelModel = function (searchResponse) {
    var responseObject = JSON.parse(searchResponse);
    var hitCount = (responseObject.meta.results.limit < responseObject.meta.results.total) ? 
        responseObject.meta.results.limit : responseObject.meta.results.total;   //@TODO: handle 100+
    var brandNames = []; 
    var genericNames = [];

    (function toArrays() {
        //@TODO: wouldn't this always be > 0?
        if (hitCount > 0) {
            for (var idx = 0; idx < hitCount; idx++) {
                if (responseObject.results[idx].openfda !== undefined) {
                    // has openFDA data
                    if (responseObject.results[idx].openfda.brand_name !== undefined &&
                        brandNames.indexOf(responseObject.results[idx].openfda.brand_name + '') === -1) {
                        brandNames.push(responseObject.results[idx].openfda.brand_name.toString());
                    }
                    if (responseObject.results[idx].openfda.generic_name !== undefined &&
                        genericNames.indexOf(responseObject.results[idx].openfda.generic_name + '') === -1) {
                        genericNames.push(responseObject.results[idx].openfda.generic_name.toString());
                    }
                } 
            }
        }
    })();

    return {
        rawTotal: hitCount,
        results: {
            brandNames: brandNames,
            genericNames: genericNames
        }
    };
};

module.exports = DrugLabelModel;
