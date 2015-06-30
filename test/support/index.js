var nock = require('nock');

var mockData = nock('https://api.fda.gov')
  .get('/drug/label.json?search=openfda.brand_name:hero+openfda.generic_name:hero&limit=10&api_key=fWo3VYTbToPaLcFem1T9ZJqqNHNmetmU3peGa1BF')
  .replyWithFile(200, __dirname + '/mocks/search.json', {
    'Content-Type': 'application/json'
  });

module.exports = mockData;
