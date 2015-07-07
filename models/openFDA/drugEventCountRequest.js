'use strict';

//@TODO: IMPLEMENT
var FDASearchModel = function (requestQueryData, apiKey) {
    var drug = requestQueryData.drug;
    var mode = requestQueryData.mode;
    var drugEvent = requestQueryData.drugevent;
    var year = requestQueryData.year;

    function toSearchQueryString() {
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
            //leave empty
    	}

        var drugEventSearchValue = (!drugEvent || drugEvent === undefined) ?
            '' : 'patient.reaction.reactionmeddrapt:' + drugEvent;

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var startYear = (!year || year === undefined || year > currentYear) ?
            currentYear - 5 : year;

        var mm = (currentDate.getMonth()+1).toString();
        var dd = currentDate.getDate().toString();
        mm = (mm.length === 2) ? mm : '0' + mm;
        dd = (dd.length === 2) ? dd : '0' + dd;

        var timeSearchValue = 'receiptdate:[' + startYear + '0101+TO+' +
            currentYear + mm + dd + ']'; //e.g. [20130101+TO+20140629]


        var countValue = '&count=receiptdate';
        var apiKeyValue = (apiKey !== undefined && apiKey !== '') ? '&api_key=' + apiKey : '';

        var search = '?search=(' + nameSearchValue + ')';

        search += (drugEventSearchValue !== '') ?
          '+AND+(' + drugEventSearchValue + ')'
          : '';

        search += '+AND+(' + timeSearchValue + ')' + countValue + apiKeyValue;

        //console.log('Test: ' + search);

    	return search;
    }

    //@TODO add function to return all years in data range to verify empty results returned when applicable?

    return {
        drug: drug,
        mode: mode,
        drugEvent: drugEvent,
        startYear: year,
        timeseriesQuery: toSearchQueryString
    };
};

module.exports = FDASearchModel;
