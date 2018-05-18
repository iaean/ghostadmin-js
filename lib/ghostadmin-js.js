/*
 * phpipam-js
 * https://github.com/iaean/phpipam-js
 *
 * Copyright (c) 2016 iaean
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var events = require('events');
var deepExtend = require('deep-extend');

function ghostAPI(options) {
  // jshint -W040
  if (!(this instanceof ghostAPI)) return new ghostAPI(options); // jscs:ignore requireCapitalizedConstructors
  var self = this;
  // jshint +W040
  self.agentPool = { maxSockets: 5 };
  self.reqDefaults = {
    request: {
      method: 'GET',
      pool: self.agentPool,
      headers: {},
      strictSSL: false,
      json: true
    }
  };
  if (!options)
    throw 'Please specify baseURI, username and password...';
  if (!options.baseURI || !options.username || !options.password)
    throw 'Please specify baseURI, username and password...';
  self.options = deepExtend({
    base: options.baseURI,
    user: options.username,
    pass: options.password }, self.reqDefaults, options);

  // self.init();
  self.token = null;
  self.config = null;
  self.session = null;
  self.openRequests = [];
}
util.inherits(ghostAPI, events.EventEmitter);

ghostAPI.prototype.init = function() {
  var self = this;
  self.token = null;
  self.config = null;
  self.session = null;
  self.openRequests = [];
};

ghostAPI.prototype.reqOpts = function(c, o, t) {
  var self = this;
  if (!t) {
    return deepExtend({}, self.options.request, {
      url: self.options.base + c
    }, o ? o : {});
  } else {
    return deepExtend({}, self.options.request, {
      url: self.options.base + c,
      headers: { 'Authorization': 'Bearer ' + t }
    }, o ? o : {});
  }
};

require('./async.js')(ghostAPI);

module.exports = ghostAPI;
