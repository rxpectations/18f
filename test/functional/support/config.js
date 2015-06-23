var port = process.env.PORT || '8000';
var baseurl = process.env.URL || 'http://localhost:';
baseurl += port;

module.exports = {
  baseURL: baseurl
};
