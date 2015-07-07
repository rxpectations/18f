'use strict';

var FDASearchModel = function (requestQueryData, apiKey, infoDetail) {
	var DEFAULT_LIMIT = 10;
    var term = requestQueryData.drug;
    var mode = requestQueryData.mode;

    function toSearchQueryString(useStrictQuotes) {
    	var searchValue = '';
        var resultsLimit = (infoDetail === true) ? 1 : DEFAULT_LIMIT;

        if (!mode || mode === undefined) {
            mode = 'name';
        }

        var nameSearchValue;
        if (useStrictQuotes === true) {
            nameSearchValue = 'openfda.brand_name:"' + term + '"+' + 'openfda.generic_name:"' + term + '"';
        } else {
            nameSearchValue = 'openfda.brand_name:' + term + '+' + 'openfda.generic_name:' + term;
        }

    	if (mode === 'name') {
			  searchValue = nameSearchValue;
    	} else if (mode === 'use') {
    		searchValue = 'purpose:' + term + '+' + 'indications_and_usage:' + term;
    	} else if (mode === 'all') {
            searchValue = 'purpose:' + term + '+' + 'indications_and_usage:' + term + '+' + 
                nameSearchValue;
    	} else {

        }

        var apiKeyValue = (apiKey !== undefined && apiKey !== '') ? '&api_key=' + apiKey : '';
    	return '?search=' + searchValue + '&limit=' + resultsLimit + apiKeyValue;
    }

    function toLiberalSearchQueryString() {
        return toSearchQueryString(false);
    }

    function toStrictSearchQueryString() {
        return toSearchQueryString(true);
    }

    return {
        term: term,
        mode: mode,
        query: toSearchQueryString, 
        exactQuery: toStrictSearchQueryString
    };
};

module.exports = FDASearchModel;
