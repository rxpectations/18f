module.exports = function() {

    function getRandomInt() {
        return Math.floor(Math.random() * (10000 - 100)) + 100;
    }

    return {
      "results": [
        {
          "year": "2015",
          "total": 0,
          "events": []
        }, 
        {
          "year": "2011",
          "total": -1,
          "events": []
        }, 
        {
          "year": "2014",
          "total": getRandomInt(),
          "events": [
            {
                "term": "DRUG INEFFECTIVE",
                "count": 706
            }, 
            {
                "term": "PAIN",
                "count": 420
            }, 
            {
                "term": "NAUSEA",
                "count": 334
            }, 
            {
                "term": "HEADACHE",
                "count": 298
            }, 
            {
                "term": "FATIGUE",
                "count": 261
            }, 
            {
                "term": "VOMITING",
                "count": 190
            }, 
            {
                "term": "DIARRHOEA",
                "count": 170
            }, 
            {
                "term": "DYSPNOEA",
                "count": 153
            }, 
            {
                "term": "ANXIETY",
                "count": 144
            }, 
            {
                "term": "ARTHRALGIA",
                "count": 109
            }
          ]
        }, 
        {
          "year": "2012",
          "total": getRandomInt(),
          "events": [
            {
                "term": "PAIN",
                "count": 1180
            }, 
            {
                "term": "DRUG INEFFECTIVE",
                "count": 1084
            }, 
            {
                "term": "ANXIETY",
                "count": 669
            }, 
            {
                "term": "PULMONARY EMBOLISM",
                "count": 636
            }, 
            {
                "term": "INJURY",
                "count": 620
            }, 
            {
                "term": "DEEP VEIN THROMBOSIS",
                "count": 579
            }, 
            {
                "term": "HEADACHE",
                "count": 552
            }, 
            {
                "term": "NAUSEA",
                "count": 533
            }, 
            {
                "term": "DYSPNOEA",
                "count": 298
            }, 
            {
                "term": "EMOTIONAL DISTRESS",
                "count": 211
            }
          ]
        }, 
        {
          "year": "2013",
          "total": getRandomInt(),
          "events": [
            {
                "term": "DRUG INEFFECTIVE",
                "count": 1526
            }, 
            {
                "term": "PAIN",
                "count": 754
            }, 
            {
                "term": "NAUSEA",
                "count": 569
            }, 
            {
                "term": "HEADACHE",
                "count": 537
            }, 
            {
                "term": "FATIGUE",
                "count": 449
            }, 
            {
                "term": "VOMITING",
                "count": 401
            }, 
            {
                "term": "DYSPNOEA",
                "count": 370
            }, 
            {
                "term": "DIARRHOEA",
                "count": 299
            }, 
            {
                "term": "DIZZINESS",
                "count": 262
            }, 
            {
                "term": "ANXIETY",
                "count": 256
            }
          ]
        }
      ]
    };

}
