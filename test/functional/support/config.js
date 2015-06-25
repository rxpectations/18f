var port = process.env.PORT || '8000';
var baseurl = process.env.URL || 'http://dev-18F.herokuapp.com';

var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  host: 'ondemand.saucelabs.com',
  port: 80,
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  name: "PwCexc 18F",
  public: "public",
  logLevel: 'silent'
}

module.exports = {
  baseURL: baseurl,
  options: options
};
