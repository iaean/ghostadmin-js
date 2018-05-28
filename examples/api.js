#!/usr/bin/env node

'use strict';

var GhostAPI = require('./../lib/ghostadmin-js');
var api = new GhostAPI({
  baseURI: 'http://localhost/ghost/api/v0.1',
  username: 'foo@bar.org',
  password: 'foobarbaz1' });

api.login(); //.catch(function(e) {console.error(e);});
api.request('/themes/').then(function(json) { console.log(JSON.stringify(json)); });
api.logout(); //.catch(function(e) {console.error(e);});

// Export content: /db/?access_token=..
// List themes: /themes/
// Download theme: /themes/casper/download/?access_token=..
