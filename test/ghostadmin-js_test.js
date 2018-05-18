'use strict';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

// var ghostadmin_js = require('../lib/ghostadmin-js.js');

exports['awesome'] = { // jscs:ignore requireDotNotation
  setUp: function(done) {
    // setup here
    done();
  },
  skel: function(test) {
    test.expect(1);
    // tests here
    // test.equal(ghostadmin_js.awesome(), 'awesome', 'should be awesome.');
    test.ok(true, 'initial assertion should pass');
    test.done();
  },
  tearDown: function(done) {
    // cleanup here
    done();
  }
};
