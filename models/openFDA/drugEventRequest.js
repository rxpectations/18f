'use strict';

//@TODO: IMPLEMENT
var FDASearchModel = function (requestQueryData, apiKey) {
	var DEFAULT_LIMIT = 10;
    var drug = requestQueryData.drug;
    var mode = requestQueryData.mode;
    var startYear = requestQueryData.year;

    function toSearchQueryString(useCount, resultsLimit) {
    	if (!mode || mode === undefined) {
            mode = 'name';
        }

        var nameSearchValue = '';
    	if (mode && mode === 'name') {
			nameSearchValue = 'patient.drug.medicinalproduct:' + drug + '+' +
                'patient.drug.openfda.brand_name:' + drug + '+' +
                'patient.drug.openfda.generic_name:' + drug;
    	} else if (mode && mode === 'code') {
    		nameSearchValue = 'patient.drug.openfda.package_ndc:' + drug + '+' +
                'patient.drug.openfda.spl_id:' + drug;
    	} else {
            // leave empty
    	}

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        startYear = (!startYear || startYear === undefined || startYear > currentYear) ? 
            currentYear - 5 : startYear;     //if start year (year) is empty, default to 5 years ago
        
        var mm = (currentDate.getMonth()+1).toString();
        var dd = currentDate.getDate().toString();
        mm = (mm.length === 2) ? mm : '0' + mm;
        dd = (dd.length === 2) ? dd : '0' + dd;

        //@wARN results slightly different if date strings have dashes
        var timeSearchValue = 'receiptdate:[' + startYear + '0101+TO+' + 
            currentYear + mm + dd + ']'; //e.g. [20130101+TO+20140629]


        var countValue = (useCount) ? '&count=patient.reaction.reactionmeddrapt.exact' : '';
        var apiKeyValue = (apiKey !== undefined && apiKey !== '') ? '&api_key=' + apiKey : '';
    	return '?search=(' + nameSearchValue + ')+AND+(' + timeSearchValue + ')' + 
            '&limit=' + resultsLimit + countValue + apiKeyValue;
    }

    function toTotalsSearchQueryString() {
        return toSearchQueryString(false, 1);
    }

    function toEventsSearchQueryString() {
        return toSearchQueryString(true, DEFAULT_LIMIT);
    }

    return {
        drug: drug,
        mode: mode,
        year: startYear,
        totalsQuery: toTotalsSearchQueryString,
        eventsQuery: toEventsSearchQueryString
    };
};

module.exports = FDASearchModel;
