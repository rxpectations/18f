'use strict';

//@TODO: IMPLEMENT
var FDASearchModel = function (requestQueryData) {
	var DEFAULT_LIMIT = 100;
    var drug = requestQueryData.drug;
    var mode = requestQueryData.mode;
    var year = requestQueryData.year;

    function toSearchQueryString() {
    	var nameSearchValue = '';
        var timeSearchValue = '[2004-01-01+TO+2005-01-01]';

        if (!mode || mode == undefined) {
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

    	}

    	return '?search=(' + nameSearchValue + ')+AND+(' + timeSearchValue + ')' + 
            '&limit=' + DEFAULT_LIMIT +
            '&count=patient.reaction.reactionmeddrapt.exact';
    }

    return {
        drug: drug,
        mode: mode,
        year: year,
        query: toSearchQueryString
    };
};

module.exports = FDASearchModel;