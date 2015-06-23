'use strict';

//@TODO: IMPLEMENT
var FDASearchModel = function (requestQueryData) {
	var DEFAULT_LIMIT = 10;
    var term = requestQueryData.term;
    var mode = requestQueryData.mode;

    function toSearchQueryString() {
    	var searchValue = '';

    	if (mode && mode == 'name') {
			searchValue = "openfda.brand_name:" + term + "+" + "openfda.generic_name:" + term;
    	} else if (mode && mode == 'use') {
    		searchValue = "purpose:" + term + "+" + "indications_and_usage:" + term;
    	} else {

    	}

    	return '?search=' + searchValue + '&limit=' + DEFAULT_LIMIT;
    }

    return {
        term: term,
        mode: mode,
        query: toSearchQueryString
    };
};

module.exports = FDASearchModel;
