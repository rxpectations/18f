'use strict';

//@TODO: IMPLEMENT
var FDASearchModel = function (requestQueryData, apiKey) {
	var DEFAULT_LIMIT = 10;
    var drug = requestQueryData.drug;
    var mode = requestQueryData.mode;
    var year = requestQueryData.year;
    //var apiKey = apiKey;

    function toSearchQueryString(useCount) {
    	var nameSearchValue = '';
        var timeSearchValue = 'receiptdate:';

        if (!mode || mode === undefined) {
            mode = 'name';
        }

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
        if (!year || year === undefined) {
            year = currentYear;
        }

        if (year === currentYear) {
            var mm = (currentDate.getMonth()+1).toString();
            var dd = currentDate.getDate().toString();
            mm = (mm.length === 2) ? mm : '0' + mm;
            dd = (dd.length === 2) ? dd : '0' + dd;

            timeSearchValue += '[' + year + '0101+TO+' + year + mm + dd + ']'; //e.g. [20140101+TO+20141231]
        } else {
            timeSearchValue += '[' + year + '0101+TO+' + year + '1231]'; //e.g. [20140101+TO+20141231]
            //@wARN results slightly different if date string have dashes
        }

        var countValue = (useCount) ? '&count=patient.reaction.reactionmeddrapt.exact' : '';
        var apiKeyValue = (apiKey !== undefined && apiKey !== '') ? '&api_key=' + apiKey : '';
    	return '?search=(' + nameSearchValue + ')+AND+(' + timeSearchValue + ')' + 
            '&limit=' + DEFAULT_LIMIT + countValue + apiKeyValue;
    }

    function toTotalsSearchQueryString() {
        return toSearchQueryString(false);
    }

    function toEventsSearchQueryString() {
        return toSearchQueryString(true);
    }

    return {
        drug: drug,
        mode: mode,
        year: year,
        totalsQuery: toTotalsSearchQueryString,
        eventsQuery: toEventsSearchQueryString
    };
};

module.exports = FDASearchModel;
