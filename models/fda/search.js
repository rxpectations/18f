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


var FDASearchModel = function (requestQueryData) {
    var term = requestQueryData.term;
    var mode = requestQueryData.mode;

    function toSearchQueryString() {
    	var searchValue = '';

    	if (mode && mode == "all") {
			searchValue = "openfda.brand_name:" + term + "+" + "openfda.generic_name:" + term;
    	} else {

    	}

    	return '?search=' + searchValue + '&limit=100';
    }

    return {
        term: term,
        mode: mode,
        query: toSearchQueryString
    };
};

module.exports = FDASearchModel;
