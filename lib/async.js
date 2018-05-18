'use strict';

module.exports = function(ghostAPI) {
  // var _ = require('underscore');
  // var deepExtend = require('deep-extend');
  var Promise = require('bluebird');
  Promise.config({
    warnings: true,
    cancellation: true
  });

  var request = require('./request.js');

  ghostAPI.prototype.reqProm = new Promise.promisify(request); // Promisify request

  ghostAPI.prototype.login = function() { // API login
    var self = this;
    if (self.session) return self.session;

    self.session = self.reqProm(self.reqOpts('/configuration/', { }))
    .then(function(data) {
      self.config = data;
      return self.reqProm(self.reqOpts('/authentication/setup/', { }))
      .then(function() {
        // TODO: Check setup...
        var form = { 'client_id': self.config.configuration[0].clientId,
                     'client_secret': self.config.configuration[0].clientSecret,
                     'grant_type': 'password',
                     'password': self.options.pass,
                     'username': self.options.user };
        return self.reqProm(self.reqOpts('/authentication/token/',
                                         { method: 'POST', form: form }))
        .then(function(data) {
          self.token = data;
          console.log(data.access_token + ': Logged in.');
          process.once('beforeExit', function() {
            self.logout(true);
          });
        });
      });
    });
    return self.session;
  };

  ghostAPI.prototype.request = function(c, o) { // API query
    var self = this;
    if (!self.session)
      return Promise.reject(new Error('Unable to request ' +
        self.options.base + ' [Invalid login session]'));

    return self.session.then(function() {
      var q = self.reqProm(self.reqOpts(c, o, self.token.access_token));
      self.queueRequest(q);
      return q;
    });
  };

  ghostAPI.prototype.queueRequest = function(r) {
    var self = this;
    // Note: Some poor mans resource management...
    if (self.openRequests.length > 0) {
      for (var i = self.openRequests.length - 1; i--;) {
        if (!(self.openRequests[i].isPending()))
          self.openRequests.splice(i, 1);
      }
    }
    self.openRequests.push(r);
  };

  ghostAPI.prototype.injectLock = function() {
    var self = this;
    // var lock = new Promise(function(resolve, reject, cancel) {});
    var lock = new Promise(function() {});
    self.queueRequest(lock);
    return lock;
  };

  ghostAPI.prototype.logout = function(s) { // API logout
    var self = this;
    if (!self.session) {
      if (s) return; // we are logging out via process@beforeExit
      return Promise.reject(new Error('Unable to logout from ' +
        self.options.base + ' [Invalid login session]'));
    }
    return self.session.then(function() {
      // Note: Logout only until all outstanding requests are done.
      //       http://bluebirdjs.com/docs/api/reflect.html
      return Promise.all(self.openRequests.map(function(p) {
          return p.reflect();
        }))
        .then(function() {
          var t1 = { client_id: self.config.configuration[0].clientId,
                       client_secret: self.config.configuration[0].clientSecret,
                       token: self.token.access_token,
                       token_type_hint: 'access_token' };
          var t2 = { client_id: self.config.configuration[0].clientId,
                       client_secret: self.config.configuration[0].clientSecret,
                       token: self.token.refresh_token,
                       token_type_hint: 'refresh_token' };
          return self.reqProm(self.reqOpts('/authentication/revoke',
                                           { method: 'POST', form: t1 },
                                           self.token.access_token))
          .then(function() {
            return self.reqProm(self.reqOpts('/authentication/revoke',
                                             { method: 'POST', form: t2 },
                                             self.token.access_token))
            .then(function() {
              console.log(self.token.access_token + ': Logged out.');
              self.init();
            });
          });
        });

    });
  };

};
