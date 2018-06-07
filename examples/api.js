#!/usr/bin/env node

'use strict';

var GhostAPI = require('./../lib/ghostadmin-js');
var api = new GhostAPI({
  baseURI: 'http://localhost/ghost/api/v0.1',
  username: 'foo@bar.org',
  password: 'foobarbaz1' });

api.login(); //.catch(function(e) {console.error(e);});
api.request('/themes/').then(function(json) { console.log(JSON.stringify(json, null, 2)); });
api.logout(); //.catch(function(e) {console.error(e);});

// Export content: /db/?access_token=..

// db[0].data:
//  "posts": [
//    {
//      "feature_image": "https://...",
//      "og_image": null, /* Facebook? */
//      "twitter_image": null,
//  "users": [
//    {
//      "profile_image": null,
//      "cover_image": null,
//  "settings": [
//    {
//      "key": "logo",
//      "value": "https://casper.ghost.org/v1.0.0/images/ghost-logo.svg",
//    {
//      "key": "cover_image",
//      "value": "https://casper.ghost.org/v1.0.0/images/blog-cover.jpg",
//    {
//      "key": "icon",
//      "value": "",
//  "tags": [
//    {
//      "feature_image": null,

// List themes: /themes/

// {
//   "themes": [
//    {
//      "name": "casper",
//      // "package": {...},
//      "active": true,
//      "templates": []
//    }
//  ]
// }

// Download theme: /themes/casper/download/?access_token=..
