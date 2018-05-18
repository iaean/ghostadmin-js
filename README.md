# Ghost Admin Client for Node and the Browser
<!---
[![Build Status](https://secure.travis-ci.org/iaean/ghostadmin-js.png?branch=master)](http://travis-ci.org/iaean/ghostadmin-js)
[![NPM](https://nodei.co/npm/ghostadmin-js.png?downloads=false)](https://nodei.co/npm/ghostadmin-js/)
-->

This is a javascript client utilizing the admin [REST API][0] of [Ghost][]. It's running via node or browser.  
The async part is based on [Bluebird][4] Promises. HTTP work by [request][5].

## Usage

Install [globally] via `npm`: `npm install [-g] ghostadmin-js`

:exclamation: Note: It's not published, yet.

```javascript
var GhostAPI = require('ghostadmin-js');
var api = new GhostAPI({
  baseURI: 'https://ghost.example.com/ghost/api/v0.1',
  username: '...',
  password: '...' });
api.login();
api.request('/themes/').then(function(r) { console.log(r.data); });
api.logout();
```
```html
<html><head/><body>
  <script src="/ghostadmin.min.js"></script>
  <script>
    var api = new GhostAPI({
      baseURI: 'https://ghost.example.com/ghost/api/v0.1',
      username: '...',
      password: '...' });
    api.login();
    api.request('/themes/').then(function(r) { console.log(r.data); });
    api.logout();
  </script>
</body></html>
```
You must provide a valid username and password.  
Consult the User management interface of Ghost.

#### .login()

Login to API, using credentials applied to constructor (see above). Returns a promise for the login request.  
But you can use it in a synchronous style. Subsequent queries _waiting_ for successful login (see examples, below).

#### .logout()

Logout from API. Returns a promise for the logout request.  
But you can use it in a synchronous style. Its _waiting_ for outstanding queries (see examples, below).

#### .request(controllerPath, [configObject])

Makes an API call. Returns resulting JSON blob in a promise for the request.

###### Arguments

* `controllerPath` - Target API controller URI. Its append to `baseURI`
* `configObject` - Configuration object fed directly to [request()][5]. Defaults to `{ method: 'GET' }`.

## Examples

* [async.js](examples/async.js) - call some functions
* [dumpSync.js](examples/dumpSync.js) - dumps a JSON blob of all networks and VLANs
* [dumpTree.js](examples/dumpTree.js) - prints the network tree based on a dump
* [index.html](examples/index.html)   
  Use [Browsersync][6], run
  `browser-sync start --server --host A.B.C.D --index examples/index.html`
  and point your browser to `A.B.C.D:3000` or `A.B.C.D:3001` to play with a small widget example.

## Contributing

* Your help to add new functionality is very welcome.
* [Grunt][1] is used as build system.
* In lieu of a formal styleguide, take care to maintain the existing coding style.
* Try to add unit tests for new or changed functionality and run `grunt test`.
* Lint your code via `grunt lint`.
* __Squash__ your changes to a single commit __before__ firing a Pull Request.

## License
Copyright (c) 2016 iaean  
Licensed under the MIT license.

[0]: http://phpipam.net/api-documentation/
[1]: http://gruntjs.com/
[2]: https://github.com/laverdet/node-fibers
[3]: http://alexeypetrushin.github.io/synchronize/
[4]: http://bluebirdjs.com/
[5]: https://github.com/request/request
[6]: https://browsersync.io
[7]: https://www.w3.org/TR/cors/
[8]: https://www.w3.org/wiki/CORS_Enabled
