var port = process.env.PORT || '8000';
var baseurl = process.env.URL || 'http://dev-18F.herokuapp.com';

var desiredCapabilities = {
  browserName: 'phantomjs'
};

module.exports = {
  baseURL: baseurl,
  desiredCapabilities: desiredCapabilities
};
