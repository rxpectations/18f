var port = process.env.PORT || '8000';
var baseurl = process.env.URL || 'http://localhost:';
baseurl += port;

var desiredCapabilities = {
  browserName: 'phantomjs'
};

module.exports = {
  baseURL: baseurl,
  desiredCapabilities: desiredCapabilities
};
