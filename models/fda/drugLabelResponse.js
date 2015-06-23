'use strict';

/*
module.exports = function FDASearchModel(reqQuery) {
    return {
        name: 'search',
        term: reqQuery.term,
        mode: reqQuery.mode,
    };
};
*/


var DrugLabelModel = function (searchResponse) {
    var responseObject = JSON.parse(searchResponse);
    var hitCount = (responseObject.meta.results.limit < responseObject.meta.results.total) ? responseObject.meta.results.limit : responseObject.meta.results.total;   //@TODO: handle 100+
    var brandNames = []; 
    var genericNames = [];

    (function toArrays() {
        if (hitCount > 1) {
            for (var idx = 0; idx < hitCount; idx++) {
console.log(idx);
                if (responseObject.results[idx].openfda !== undefined) {
                    // has openFDA data
                    if (responseObject.results[idx].openfda.brand_name !== undefined 
                        && brandNames.indexOf(responseObject.results[idx].openfda.brand_name + '') == -1) {
                        brandNames[brandNames.length] = responseObject.results[idx].openfda.brand_name + '';
                    }
                    if (responseObject.results[idx].openfda.generic_name !== undefined 
                        && genericNames.indexOf(responseObject.results[idx].openfda.generic_name + '') == -1) {
                        genericNames[genericNames.length] = responseObject.results[idx].openfda.generic_name + '';
                    }
                } 
            }
        }
    })();

    return {
        labelsFound: hitCount,
        brandNames: brandNames,
        genericNames: genericNames
    };
};

module.exports = DrugLabelModel;
