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
    var hitCount = searchResponse.meta.total;
    var brandNames = []; 
    var genericNames = [];]

    function toString() {
    }

    return {
        term: term,
        mode: mode,
        query: toSearchQueryString
    };
};

module.exports = FDASearchModel;
