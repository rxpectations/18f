'use strict';

module.exports = {
  startApp: function (distro, done) {
    this.UI().visit(distro).then(done, done);
  }
};
