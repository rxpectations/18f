'use strict';

var DrugLabelModel = function (searchResponse) {
    var responseObject;
    var hitCount = 0;
    var results = []; 

    if (searchResponse !== null) {
        responseObject = JSON.parse(searchResponse);
        hitCount = (responseObject.meta.results.limit < responseObject.meta.results.total) ? 
        responseObject.meta.results.limit : responseObject.meta.results.total; 
        //no need to handle 100+ result queries so far
    }

    for (var idx = 0; idx < hitCount; idx++) {
        if (responseObject.results[idx] !== undefined) {
            var recallResult = {};
            recallResult.number = responseObject.results[idx].recall_number;
            recallResult.reason = responseObject.results[idx].reason_for_recall;
            recallResult.status = responseObject.results[idx].status;
            recallResult.distribution = responseObject.results[idx].distribution_pattern;
            recallResult.city = responseObject.results[idx].city;
            recallResult.state = responseObject.results[idx].state;
            recallResult.country = responseObject.results[idx].country;
            recallResult.initiationDate = responseObject.results[idx].recall_initiation_date;
            recallResult.reportDate = responseObject.results[idx].report_date;
            recallResult.productDescription = responseObject.results[idx].product_description;
            recallResult.codeInfo = responseObject.results[idx].code_info;

            results.push(recallResult);
        } 
    }

    return {
        total: hitCount,
        results: results
    };
};

module.exports = DrugLabelModel;
