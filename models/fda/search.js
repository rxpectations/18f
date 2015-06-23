'use strict';


var FDASearchModel = function (searchTerm, searchMode) {
    return {
        name: 'search',
        description: 'desc',
        toQueryString: function () {

        }
    };
};

module.exports = new FDASearchModel(term, mode);